<template>
  <div class="mb-12">
    <v-app-bar color="primary" dark fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>N-Gross</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
      <v-btn><v-icon>mdi-basket</v-icon> <span class="ml-2">{{$store.state.cart}}</span></v-btn>
    </v-app-bar>

    <!-- Navigation Lide for Mobile -->
    <v-navigation-drawer v-model="drawer" fixed>
      <v-list nav dense>
        <v-list-item-group
          active-class="primary--text text--accent-4"
        >
          <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.to">
            <v-list-item-icon>
              <v-icon>mdi-{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
};
</script>

<style>
</style>