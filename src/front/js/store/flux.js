const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null || localStorage.getItem("token"),
			username: null || localStorage.getItem("username"),
			products: [],
			totalShoppingCart: 0,
			users: [],
			gyms: [],
			transactions: [],
			newsletter: [],
			profile: null,
			favorites: {
				back: [],
				cardio: [],
				chest: [],
				neck: [],
				shoulders: [],
				upperarms: [],
				lowerarms: [],
				upperlegs: [],
				lowerlegs: [],
				waist: []
			}
		},
		actions: {
			setUsername: (username) => {
				setStore({ username: username })
			},
			createUser: async (user) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/create-user",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(user)

						})
					const data = await response.json()
					console.log(data)
					return true
				}
				catch (error) {
					console.log(error)
					return false
				}
			},
			loginUser: async (username, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/token",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({ username, password })

						})
					const data = await response.json()
					localStorage.setItem("token", data.token)
					localStorage.setItem("username", username)
					setStore({ token: data.token, profile: data.user })
					console.log(data)
					return true
				}
				catch (error) {
					console.log(error)
					return false
				}
			},

			logout: () =>{				
					localStorage.removeItem("token")
					localStorage.removeItem("username")
					setStore({token: null, username: null})					
					return true				
			},

			loginAdmin: async (username, password) =>{
				try{
					const response = await fetch(process.env.BACKEND_URL + "api/token-admin",
					{
						method:"POST",
						headers:{
							"Content-Type":"application/json"
						},
						body:JSON.stringify({username, password})
						
					} )
					const data = await response.json()
					if (!data.token){
						return false
					}
					localStorage.setItem("token", data.token )
					localStorage.setItem("username", username)
					setStore({token: data.token})
					console.log(data)
					return true
				}
				catch(error){
					console.log(error)
					return false
				}	
			},

			logout: () =>{				
					localStorage.removeItem("token")
					setStore({token: null})					
					return true				
			},

			getProducts: async () => {
				try {
					const resp = await fetch("https://fakestoreapi.com/products")
					const data = await resp.json()
					data.forEach(product => {
						product.price = product.price.toLocaleString("es-Es", { style: "currency", currency: "USD" });
					});
					setStore({ products: data })
					return data;

				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			addToCart: (title, price, image, id, quantity) => {
				const store = getStore()
				setStore({ products: [{ title: title, price: price, image: image, id: id, quantity: quantity }, ...store.products] })
				alert(`Added to cart`)
			},
			removeFromCart: (id) => {
				const store = getStore()
				setStore({
					products: store.products.filter((item) => item.id != id),
				})
				getActions().calculateTotalCart();
			},
			calculateTotalCart: () => {
				const store = getStore()

				const totalValue = store.products.map(product => product.price * product.quantity).reduce((accumulator, currentValue) => accumulator + currentValue)

				setStore({ totalShoppingCart: totalValue })
			},
			setQuantity: (id, quantity) => {
				const store = getStore()
				console.log(id)
				store.products.forEach((item, index) => {
					if(item.id == id) {
						store.products[index].quantity = quantity
					}
				})
			},
			addFavExercise: (bodypart, exercise) => {
				// Eliminar espacios en blanco de bodypart
				const newBodypart = bodypart.replace(/\s/g, '')
				const store = getStore();
				if (store.favorites[newBodypart].includes(exercise)) return
				
				if (store.favorites.hasOwnProperty(newBodypart)) {
					const newFavorite = {...store.favorites, [newBodypart]: [...store.favorites[newBodypart], exercise] }
					setStore({ favorites: newFavorite })
				} else {
					console.log(`no existe el key en el objeto`)
				}
			},
			removeFavExercise: (bodypart, exercise) => {
				const newBodypart = bodypart.replace(/\s/g, '')
				const store = getStore()
				if (store.favorites.hasOwnProperty(newBodypart)) {
					const newFavorite = { ...store.favorites, [newBodypart]: store.favorites[newBodypart].filter(exerciseItem => exerciseItem != exercise) }
					setStore({ favorites: newFavorite });
				}
			},	
			getData: async () => {
				const store = getStore();
				const response = await fetch(process.env.BACKEND_URL + `api/users?username=${store.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				}
				);
				const data = await response.json();
				setStore({ users: data });	
				const gyms = await fetch(process.env.BACKEND_URL + `api/get-gyms?username=${store.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				}
				);
				const dataGyms = await gyms.json();
				setStore({ gyms: dataGyms });
				const newsletter = await fetch(process.env.BACKEND_URL + `api/get-newsletter?username=${store.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				}
				);
				const dataNewsletter = await newsletter.json();
				setStore({ newsletter: dataNewsletter });
				const admins = await fetch(process.env.BACKEND_URL + `api/get-admins?username=${store.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				}
				);
				const dataAdmins = await admins.json();
				setStore({ admins: dataAdmins });
				const transactions = await fetch(process.env.BACKEND_URL + `api/get-transactions?username=${store.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				}
				);
				const dataTransactions = await transactions.json();
				setStore({ transactions: dataTransactions });
				return false;

			},
			addNewsletter: async (email) => {
				const response = await fetch(process.env.BACKEND_URL + "api/newsletter",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({email: email})
				})	
				const data = await response.json();
				console.log(data)
				if (data.msg == "Newsletter added successfully"){
					return true
				}					
					return false			
			},

			addGym: async (gym) => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + "api/create-gym",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify(gym)
				})

				// setStore({gym: [gym, ...store.gym]})

				const data = await response.json();
				console.log(data)
				if (data.msg == "Gym added successfully"){
					return true
				}					
					return false
			},
			editGym: async (gym) => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + `api/update-gym?username=${store.username}`,{
					method:"PUT",
					headers:{
						"Content-Type":"application/json",
						"Authorization": "Bearer " + store.token
					},
					body:JSON.stringify(gym)
				})
				const data = await response.json();
				//console.log(data)
				if (data.msg == "Gym edited successfully"){
					const newGyms = {...store.gyms, [gym.id]: gym}
					setStore({gyms: newGyms})

					return true
				}					
					return false				
			},
			clearCart: () => {
				setStore({ products: [] });
			},
			getTransactions: async () => {
				const transactions = await fetch(process.env.BACKEND_URL + `api/get-transactions?username=${store.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				}
				);
				const dataTransactions = await transactions.json();
				setStore({ transactions: dataTransactions });
				return false;
			}


		}

	}

};

export default getState;
