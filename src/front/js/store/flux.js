const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null || localStorage.getItem("token"),
			products: [],
			totalShoppingCart: 0,
			favorites: [],
		},
		actions: {
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
					setStore({token: null})					
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

		}

	}

};

export default getState;
