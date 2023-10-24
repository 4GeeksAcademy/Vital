const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			products: []
		},
		actions: {
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
