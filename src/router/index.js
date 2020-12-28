import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import Category from "../views/Category.vue";
import Login from "../views/Login.vue";
import Cart from "../views/Cart.vue";
import Thankyou from "../views/Thankyou.vue";
import Order from "../views/Order.vue";
import VendorProduct from "../views/vendor/Produts.vue";
import VendorOrder from "../views/vendor/Orders.vue";
import store from "../store";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
    meta: { requiresAuth: true },
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/thankyou",
    name: "Thankyou",
    component: Thankyou,
    meta: { requiresAuth: true },
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: { requiresAuth: true },
  },
  {
    path: "/vendor/product",
    name: "VendorProduct",
    component: VendorProduct,
    meta: { requiresAuth: true, vendor: true },
  },
  {
    path: "/vendor/order",
    name: "VendorOrder",
    component: VendorOrder,
    meta: { requiresAuth: true, vendor: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Checking If user is Authenticated
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //Checking if user is authentiated
    if (store.getters.isAuthenticated) {
      //Checking if user object is empty or not
      if (Object.keys(store.getters.getUser).length === 0) {
        //If empty getting the user data from api
        axios
          .get(store.getters.getApiUrl + "profile", {
            headers: {
              Authorization: `Bearer ${store.getters.getToken}`,
            },
          })
          .then((response) => {
            store.commit("setUser", {
              token: store.getters.getToken,
              user: response.data,
            });
          })
          .catch((error) => {
            //If error Loging out the user and redireting to login page
            console.error(error);
            store.dispatch("logOut");
            next("/login");
          });
      }
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

//Check if the Logedin user is vendor
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.vendor)) {
    if (store.getters.getUser.user_type === "vendor") {
      next();
      return;
    } else {
      next("/");
    }
  }
});

export default router;
