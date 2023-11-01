const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null || localStorage.getItem("token"),
			products: [],
			favorites: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			createUser: async (user) =>{
				try{
					const response = await fetch(process.env.BACKEND_URL + "api/create-user",
					{
						method:"POST",
						headers:{
							"Content-Type":"application/json"
						},
						body:JSON.stringify(user)
						
					} )
					const data = await response.json()
					console.log(data)
					return true
				}
				catch(error){
					console.log(error)
					return false
				}
				

			},
			loginUser: async (username, password) =>{
				try{
					const response = await fetch(process.env.BACKEND_URL + "api/token",
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
				try{
					const resp = await fetch("https://fakestoreapi.com/products")
					const data = await resp.json()
					data.forEach(product => {
						product.price = product.price.toLocaleString("es-Es", {style: "currency", currency: "USD"});
					});
					setStore({ products: data })
					return data;

				}
				catch(error){
					console.log("Error loading message from backend", error)
				}
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
