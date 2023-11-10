const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null || localStorage.getItem("token"),
			username: null,
			products: [],
			totalShoppingCart: 0,
			favorites: [],
			users: [],
			gyms: [],
			newsletter: [],
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
					setStore({ token: data.token })
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
			addFavorites: (exercise) => {
				const store = getStore();
				const newFavorites = [...store.favorites, exercise];
				setStore({ favorites: newFavorites });
			},
			removeFavorites: (exercise) => {
				const store = getStore();
				const newFavorites = store.favorites.filter((favorite) => favorite.id !== exercise.id);
				setStore({ favorites: newFavorites });
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
				const response = await fetch(process.env.BACKEND_URL + "api/create-gym",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({gymData: gym})
				})
				const data = await response.json();
				console.log(data)
				if (data.msg == "Gym added successfully"){
					return true
				}					
					return false
			},
			clearCart: () => {
				setStore({ products: [] });
			}


		}

	}

};

export default getState;
