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
            @click="addToCart(i)"
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
    <v-snackbar v-model="showError">
      {{ error.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="showError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductGrid",
  data(){
    return{
      showError: false,
      error:{}
    }
  },
  mounted() {
    axios.get(this.$store.state.apiUrl + "product").then((reponse) => {
      this.$store.commit("setProducts", { products: reponse.data });
    });
  },
  methods: {
    addToCart(i) {
      // console.log(this.$store.state.products[i])
      const product = this.$store.state.products.find(item=>item.id === i);
      product.quantity = 1;
      // console.log(product)
      if (product["stock"] > 0) {
        this.$store.dispatch("addProductToCart", product);
      } else {
        // console.error("Product is out of stock");
        this.showError = true;
        this.error.message = "Product is out of Stock";
      }
    },
  },
};
</script>

<style></style>
