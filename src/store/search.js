import axios from 'axios';
const SearchModule = {
    namespaced: true,
    state: () => ({ 
        products: []
    }),
    getters: {
        products: (state) => state.products
    },
    mutations: { 
        SET_PRODUCTS(state, payload){
            state.products = payload
        }
    },
    actions: { 
        getProducts({commit, rootState}, key){
            console.log(rootState.apiUrl)
            axios.get(
                rootState.apiUrl + 'search',
                {
                    params:{
                        key
                    },
                    headers: {
                        Authorization: `Bearer ${rootState.token}`,
                    },
                }
            )
            .then(response=>{
                commit('SET_PRODUCTS', response.data)
            })
            .catch(e=>console.log(e))
        }
    },
};

export default SearchModule;