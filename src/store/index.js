import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token") || null,
    user: {},
    apiUrl: "http://ngross.test/api/",
    cart: [],
    // {id, quantity}
    categories: null,
    products: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    stateUser: (state) => state.user,
    cartProducts(state) {
      return state.cart.map((cartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id
        );
        return {
          id: cartItem.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: cartItem.quantity,
        };
      });
    },
    cartTotal(state, getters) {
      let total = 0;
      getters.cartProducts.forEach((product) => {
        total += parseInt(product.price) * product.quantity;
      });
      return total;
    },
  },
  actions: {
    //Cart Actions
    addProductToCart(context, product) {
      const cartItem = context.state.cart.find(
        (item) => item.id === product.id
      );
      if (!cartItem) {
        //pushProductToCart
        context.commit("pushProductToCart", product.id);
      } else {
        //increamentItemQuanity
        context.commit("incrementItemQuantity", cartItem);
      }
    },
    incrementItemQuantity(context, productId) {
      const cartItem = context.state.cart.find((item) => item.id === productId);
      if (cartItem) {
        context.commit("incrementItemQuantity", cartItem);
      }
    },
    decrementItemQuantity({ state, commit }, productId) {
      const cartItem = state.cart.find((item) => item.id === productId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          commit("decrementItemQuantity", cartItem);
        }
      }
    },
    //Checkout Action
    checkout({ state, commit, getters }) {
      const total = getters.cartTotal;
      const cartItems = state.cart;
      axios
        .post(
          state.apiUrl + "order",
          { total, cartItems },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          commit("emptyCart");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //Account Actions
    async logOut({ commit }) {
      localStorage.removeItem("user-token");
      commit("logout");
    },
  },
  mutations: {
    //Page Mutations
    setCategories(state, payload) {
      state.categories = payload.categories;
    },
    setProducts(state, payload) {
      state.products = payload.products;
    },

    //Auth Mutations
    setUser(state, payload) {
      state.token = payload.token;
      state.user = payload.user;
    },
    logout(state) {
      (state.token = null), (state.user = {});
    },

    //Cart Mutations
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementItemQuantity(state, cartItem) {
      cartItem.quantity--;
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
      state.cart = [];
    },
  },
});
