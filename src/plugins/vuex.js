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

        // state.cart.cartItems.map((o, i) => {
        //   console.log(product.id)
        //   if(o.id == product.id) {
        //     console.log(o.id + "="+ product.id)
        //     state.cart.cartItems[i].quantity++
        //   }
        // })

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
    deleteCartItem(state, i) {
      state.cart.cartItems.splice(i, 1);
    },
    setCategories(state, payload) {
      state.categories = payload.categories;
    },
    setProducts(state, payload) {
      state.products = payload.products;
    },
  },
});
