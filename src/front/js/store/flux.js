const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null || localStorage.getItem("token"),
			username: null || localStorage.getItem("username"),
			revenue: 0,
			products: [],
			meals: [],
			totalShoppingCart: 0,
			profile: null || JSON.parse(localStorage.getItem('profile')),
			user: null || JSON.parse(localStorage.getItem("user")),
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
			sendEmail: async (subject, body_message) => {
				const store = getStore();
				const response = await fetch(process.env.BACKEND_URL + `api/send-email?username=${store.username}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({ subject: subject, body_message: body_message })
				})
				const data = await response.json();
				//console.log(data)
				if (data.msg == "Email sent successfully") {
					return true
				}
				return false
			},
			calculateRevenue: () => {
				const store = getStore();
				let revenue = 0;
				store.transactions && store.transactions.map((transaction) => {
					revenue = revenue + parseFloat(transaction.comission)
				});
				setStore({ revenue: revenue })
			},
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
					if (!data.token) {
						return false
					}
					localStorage.setItem("token", data.token)
					localStorage.setItem("username", data.user.username)
					localStorage.setItem("user", JSON.stringify(data.user))
					localStorage.setItem("profile", JSON.stringify(data.profile))
					setStore({ "token": data.token, "user": data.user, "profile": data.profile, "username": data.user.username })
					console.log(data)
					return true
				}
				catch (error) {
					console.log(error)
					return false
				}
			},

			logout: () => {
				localStorage.removeItem("token")
				localStorage.removeItem("username")
				setStore({ token: null, username: null })
				return true
			},

			loginAdmin: async (username, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/token-admin",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({ username, password })

						})
					const data = await response.json()
					console.log(data)
					if (!data.token) {
						return false
					}
					if (data.admin.role == "admin") {
						localStorage.setItem("token", data.token)
						localStorage.setItem("username", username)
						setStore({ token: data.token, username: username })
						return true
					}
					return false
				}
				catch (error) {
					console.log(error)
					return false
				}
			},

			logout: () => {
				localStorage.removeItem("token")
				setStore({ token: null })
				return true
			},
			getMeals: async (url) => {
				try {
					const resp = await fetch(url)
					const data = await resp.json()
					//	const {image,label,ingredients,calories} = data.hits[0].recipe
					const recipes = data.hits
					console.log(data.hits)
					setStore({ meals: recipes })
				}
				catch (error) {
					console.log(error)
				}
			},
			fetchFavorites: async () => {
				const store = getStore();

				const newFavorites = Object.keys(store.favorites).map((key) => {
					return { [key]: store.favorites[key].map((item) => item.id) }
				}).reduce((acc, item) => ({ ...acc, ...item }), {})

				console.log(newFavorites)

				const response = await fetch(process.env.BACKEND_URL + `api/add-favorite/${store.username}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newFavorites)
				})
				const data = await response.json();
				if (data.msg == "Favorites added successfully") {
					return true
				}
				return false
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
					if (item.id == id) {
						store.products[index].quantity = quantity
					}
				})
			},
			addFavExercise: async (bodypart, exercise, id) => {
				const store = getStore();
				const actions = getActions();
				const particularExercise = Object.values(store.favorites[bodypart])
				// console.log(particularExercise.map(item => item.id).includes(id))
				const newBodypart = bodypart.replace(/\s/g, '')
				if (particularExercise.map(item => item.id).includes(id)) return

				if (store.favorites.hasOwnProperty(newBodypart)) {
					const newFavorite = { ...store.favorites, [newBodypart]: [...store.favorites[newBodypart], { exercise: exercise, id: id }] }
					setStore({ favorites: newFavorite })
					const isPush = await actions.fetchFavorites()
					if (isPush) {
						return true
					} else {
						return false
					}
				} else {
					console.log(`no existe el key en el objeto`)
					return false
				}
			},
			removeFavExercise: async (bodypart, exercise, id) => {
				console.log(`Esto es lo que llega: ${exercise} - ${bodypart}`)
				const newBodypart = bodypart.replace(/\s/g, '').toLowerCase()
				const store = getStore()
				const actions = getActions()
				if (store.favorites.hasOwnProperty(newBodypart)) {
					const newFavorite = { ...store.favorites, [newBodypart]: store.favorites[newBodypart].filter(exerciseItem => exerciseItem.id != id) }
					setStore({ favorites: newFavorite });
					const isPush = await actions.fetchFavorites()
					if (isPush) {
						return true
					} else {
						return false
					}
				}
				console.log(`Favorites despues de ejecutar la funcion:`)
				console.log(store.favorites)
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
				const response = await fetch(process.env.BACKEND_URL + "api/newsletter", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email })
				})
				const data = await response.json();
				console.log(data)
				if (data.msg == "Newsletter added successfully") {
					return true
				}
				return false
			},

			addGym: async (gym) => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + "api/create-gym", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(gym)
				})

				// setStore({gym: [gym, ...store.gym]})

				const data = await response.json();
				console.log(data)
				if (data.msg == "Gym added successfully") {
					return true
				}
				return false
			},
			editGym: async (gym) => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + `api/update-gym?username=${store.username}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify(gym)
				})
				const data = await response.json();
				//console.log(data)
				if (data.msg == "Gym edited successfully") {
					const newGyms = { ...store.gyms, [gym.id]: gym }
					setStore({ gyms: newGyms })

					return true
				}
				return false
			},
			validateToken: async () => {
				const store = getStore()
				if (!store.token) return true
				if (!store.username) return true
				const response = await fetch(process.env.BACKEND_URL + `api/validate-token?username=${store.username}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					}
				})
				const data = await response.json();
				if (data.msg == "User not authorized" || data.msg == "Token has expired") {
					localStorage.removeItem("token")
					setStore({ token: null })
					return true
				}
				return false
			},

			getGyms: async () => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + `api/get-gyms?username=${store.username}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					}
				})
				const data = await response.json();
				setStore({ gyms: data })
				return false
			},
			changeStatus: async (email) => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + `api/update-status?username=${store.username}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({ email: email })
				})
				const data = await response.json();
				console.log(data)
				if (data.msg == "Gym updated successfully") {

					return true
				}
				return false
			},
			clearCart: () => {
				setStore({ products: [] });
			},
			getTransactions: async () => {
				const store = getStore();
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
