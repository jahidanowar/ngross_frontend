import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: "http://ngross.test/api/",
    cart: {
      cartItems: [],
      total: 0,
    },
    categories: null,
    products: null,
  },
  mutations: {
    addToCart(state, product) {
      // console.log(product)
      state.cart.total += parseInt(product.price);

      if (state.cart.cartItems.length > 0) {
        const cartItem = state.cart.cartItems.find(o=>o.id === product.id)
        if(!cartItem){
          state.cart.cartItems.push(product)
        }else{
          cartItem.quantity++
        }

      } else {
        state.cart.cartItems.push(product)
      }
    },
    deleteCartItem(state, payload) {
      state.cart.cartItems.splice(payload.index, 1);
      let total = parseInt(payload.quantity )* parseInt(payload.price)
      state.cart.total -= total
    },
    setCategories(state, payload) {
      state.categories = payload.categories;
    },
    setProducts(state, payload) {
      state.products = payload.products;
    },
  },
});
