import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import SearchModule from './search'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loading: false,
    token: localStorage.getItem("user-token") || null,
    user: {},
    userType: localStorage.getItem("user-type") || null,
    apiUrl: process.env.VUE_APP_API_URL,
    cart: [],
    categories: null,
    products: null,
    vendorProduct: null,
    vendorOrder: null,
  },
  getters: {
    getLoadingState: (state) => state.loading,
    getApiUrl: (state) => state.apiUrl,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getUserType: (state) => state.userType,
    isAuthenticated: (state) => !!state.token,
    isVendor: (state) => (state.user.user_type === "vendor" ? true : false),
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
    getVendorProduct: (state) => state.vendorProduct,
    getVendorOrder: (state) => state.vendorOrder,
    getCategories: (state) => state.categories,
    getCategory: (state, getters) => (id) => {
      console.log(getters);
      return state.categories.find((item) => item.id === id);
    },
  },
  actions: {
    //Cart Actions
    addProductToCart(context, product) {
      if (product.quantity > 0) {
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
          router.push({
            name: "Thankyou",
            params: { orderId: response.data["order"]["order_number"] },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //Vendor Products
    vendorProducts({ state, commit }) {
      axios
        .get(state.apiUrl + "vendor/product", {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          commit("setVendorProduct", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //Vendor Orders
    vendorOrders({ state, commit }) {
      axios
        .get(state.apiUrl + "vendor/order", {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          commit("setVendorOrder", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //Filter Vendor Order
    async filterVendorOrders({state, commit}, payload){
      await axios.get(state.apiUrl + "vendor/order?byhour="+payload,{
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((response)=>{
        commit("setVendorOrder", response.data);
      })
      .catch((error)=>{
        console.error(error);
      })
    },
    //Account Actions
    logOut({ state, commit }) {
      let token = state.token;
      axios
        .post(
          state.apiUrl + "logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("user-token");
          localStorage.removeItem("user-type");
          commit("logout");
          router.push("/login");
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem("user-token");
          localStorage.removeItem("user-type");
          commit("logout");
          router.push("/login");
        });
    },
    //Fetch Categoris with Products
    setCategories({ state, commit }) {
      axios.get(state.apiUrl + "category").then((response) => {
        commit("setCategories", response.data);
      });
    },
    //Fetch Products and set tate
    setProducts({ state, commit }) {
      axios.get(state.apiUrl + "product").then((response) => {
        commit("setProducts", { products: response.data });
      });
    },
    // getCategoryProducts({state}){

    // }
  },
  mutations: {
    //Chaning Loading State
    changeLoadingState(state, payload) {
      state.loading = payload;
    },
    //Page Mutations
    setCategories(state, payload) {
      // console.log("Mutation", payload);
      state.categories = payload;
    },
    setProducts(state, payload) {
      state.products = payload.products;
    },

    //Auth Mutations
    setUser(state, payload) {
      state.token = payload.token;
      state.user = payload.user;
      state.userType = payload.user.user_type;
    },
    logout(state) {
      state.token = null;
      state.user = {};
      state.userType = null;
    },

    //Cart Mutations
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
      // const existingProduct = state.products.find(
      //   (item) => item.id === product.id
      // );
      // existingProduct.quantity--;
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

    setVendorProduct(state, payload) {
      state.vendorProduct = payload;
    },
    setVendorOrder(state, payload) {
      state.vendorOrder = payload;
    },
  },
  modules:{
    search: SearchModule
  }
});
