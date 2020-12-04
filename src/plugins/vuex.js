import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        apiUrl: "http://ngross.test/api/",
        cart: [],
        categories: null,
        products: null
    },
    mutations:{
        addToCart(state, payload){
            state.cart.push(payload)
        },
        deleteCartItem(state, i){
            state.cart.splice(i,1)
        },
        setCategories(state, payload){
            state.categories = payload.categories
        },
        setProducts(state, payload){
            state.products = payload.products
        }
    }
})