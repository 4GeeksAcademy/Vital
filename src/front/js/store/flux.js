const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			products: []
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

			getMessage: async () => {
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

				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
