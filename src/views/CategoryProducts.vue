<template>
  <div class="mt-5">
    <v-container v-if="category">
      <h2 class="mb-2">{{ category.title }}</h2>
      <v-row dense>
        <v-col
          v-for="(product, i) in category.products"
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
              :disabled = "product.stock <= 0"
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
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['id'],
  mounted() {
    if (this.$store.getters.getCategories === null) {
      this.$store.dispatch("setCategories");
    }
  },
  computed: {
    category() {
      return this.$store.getters.getCategories.find(item=>item.id === this.id);
    },
  },
  methods: {
    addToCart(i) {
      console.log(i);
      // console.log(this.$store.state.products[i])
      const product = this.$store.state.products[i];
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
