<template>
  <div class="shop mt-5">
    <v-container>
      <h2 class="mb-2">All Products</h2>
      <product-grid  />
    </v-container>
  </div>
</template>

<script>
import ProductGrid from "../components/ProductGrid"
export default {
  name: "Shop",
  components:{
    ProductGrid
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>