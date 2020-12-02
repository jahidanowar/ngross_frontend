import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        apiUrl: "http://ngross.test/api/",
        cart: 0,
        categories: null,
        products: null
    },
    mutations:{
        addToCart(state){
            state.cart++
        },
        setCategories(state, payload){
            state.categories = payload.categories
        },
        setProducts(state, payload){
            state.products = payload.products
        }
    }
})