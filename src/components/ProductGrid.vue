<template>
  <div class="product-grid">
    <v-row v-if="$store.state.products != null" dense>
      <v-col
        v-for="(product, i) in $store.state.products"
        :key="i"
        cols="6"
        sm="3"
      >
        <v-card flat elevation="1">
          <v-img
            height="150"
            :src="product.image"
            class="white--text align-end"
          >
          </v-img>
          <div class="card-body px-3 py-1 mt-2">
            <h3>{{ product.title }}</h3>
            <div class="mt-1">₹ {{ product.price }}</div>
          </div>
          <v-btn
            block
            elevation="0"
            color="primary"
            class="mt-1"
            @click="$store.commit('addToCart')"
            >Add to cart</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="i in 8" cols="6" sm="3" :key="i">
        <v-skeleton-loader class="mx-auto" height="258" type="card">
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductGrid",
  mounted() {
    axios.get(this.$store.state.apiUrl + "product").then((reponse) => {
      this.$store.commit("setProducts", { products: reponse.data });
    });
  },
};
</script>

<style></style>
