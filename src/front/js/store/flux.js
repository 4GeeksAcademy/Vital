const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null || localStorage.getItem("token"),
			products: [],
			meals: []
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

			getMeals: async (url) => {
				try{
					const resp = await fetch(url)
					const data = await resp.json()
					console.log(data)
				//	const {image,label,ingredients,calories} = data.hits[0].recipe
					const recipes = data.hits
					console.log(data.hits)
					 setStore({meals: recipes })
				}
				catch(error){
					console.log(error)
				}
			},

			getProducts: async () => {
				try{
					const resp = await fetch("https://fakestoreapi.com/products")
					const data = await resp.json()
					data.forEach(product => {
						product.price = product.price.toLocaleString("es-Es", {style: "currency", currency: "USD"});
					});
					console.log(data)
					// const store = getStore()
					// console.log(store.products)
					setStore({ products: data })
					// console.log(store.products)
					return data;

				}
				catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
		
	}

};

export default getState;
