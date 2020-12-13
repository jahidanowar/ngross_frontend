import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token") || "",
    user: {},
    apiUrl: "http://ngross.test/api/",
    cart: [],
    // {id, quantity}
    categories: null,
    products: null,
  },
  getters: {
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          id: cartItem.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters) {
      let total = 0;
      getters.cartProducts.forEach(product => {
        total += parseInt(product.price) * product.quantity
      });
      return total;
    },
  },
  actions: {
    //Cart Actions
    addProductToCart(context, product) {
      const cartItem = context.state.cart.find(item => item.id === product.id)
      if (!cartItem) {
        //pushProductToCart
        context.commit('pushProductToCart', product.id);
      } else {
        //increamentItemQuanity
        context.commit('incrementItemQuantity', cartItem)
      }
    },
    incrementItemQuantity(context, productId) {
      const cartItem = context.state.cart.find(item => item.id === productId)
      if (cartItem) {
        context.commit('incrementItemQuantity', cartItem)
      }
    },
    decrementItemQuantity({ state, commit }, productId) {
      const cartItem = state.cart.find(item => item.id === productId)
      if (cartItem) {
        if (cartItem.quantity > 1) {
          commit('decrementItemQuantity', cartItem)
        }
      }
    },
    //Checkout Action
    checkout({ commit }) {
      commit('emptyCart');
    }
  },
  mutations: {
    //Page Mutations
    setCategories(state, payload) {
      state.categories = payload.categories;
    },
    setProducts(state, payload) {
      state.products = payload.products;
    },

    //Cart Mutations
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(cartItem) {
      cartItem.quantity++
    },
    decrementItemQuantity(cartItem) {
      cartItem.quantity--
    },
    addToCart(state, product) {
      // console.log(product)
      if (state.cart.length > 0) {
        const cartItem = state.cart.find((o) => o.id === product.id);
        if (!cartItem) {
          state.cart.push(product);
        } else {
          cartItem.quantity++;
        }
      } else {
        state.cart.push(product);
      }
    },
    deleteCartItem(state, payload) {
      state.cart.splice(payload.index, 1);
    },

    //Checkout Mutations
    emptyCart(state) {
      state.cart = []
    }
  },
});
