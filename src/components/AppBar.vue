<template>
  <div class="mb-12">
    <v-app-bar color="primary" dark fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>N-Gross</v-toolbar-title>

      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="secondary accent-4"
      ></v-progress-linear>

      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" icon to="login"><v-icon>mdi-account</v-icon></v-btn>
      <v-btn v-if="isAuthenticated" icon to="search"><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn v-if="isAuthenticated" to="/cart"
        ><v-icon>mdi-basket</v-icon>
        <span class="ml-2">{{ $store.state.cart.length }}</span></v-btn
      >
    </v-app-bar>

    <!-- Navigation Lide for Mobile -->
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!-- Profile Section -->
      <template v-if="isAuthenticated" v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.profile_photo_url" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.phone }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- ./Profile Section -->

      <v-divider></v-divider>

      <v-list v-if="!isVendor" nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.to">
            <v-list-item-icon>
              <v-icon>mdi-{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>
      <v-list v-if="!isVendor" nav dense>
        <v-list-item-group class="primary--text text--accent-4">
          <v-list-item to="/order">
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Orders</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list v-else nav dense>
        <v-list-item-group class="primary--text text--accent-4">
          <v-list-item to="/vendor/product">
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item>
          <v-list-item to="/vendor/order">
            <v-list-item-icon>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div v-if="isAuthenticated" class="pa-2">
          <v-btn block color="secondary" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- ./Navigation Lide for Mobile -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menus: [
        {
          label: "Home",
          icon: "home",
          to: "/",
        },
        {
          label: "Shop",
          icon: "shopping",
          to: "/shop",
        },
        {
          label: "Categories",
          icon: "shape",
          to: "/category",
        },
      ],
    };
  },
  watch: {
  },
  computed: {
    loading(){
      return this.$store.getters.getLoadingState;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.stateUser;
    },
    isVendor() {
      return this.$store.getters.isVendor;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style></style>
