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
  mounted() {
    if (this.$store.getters.getCategories === null) {
      this.$store.dispatch("setCategories");
    }
  },
  computed: {
    category() {
      return this.$store.getters.getCategory(this.$route.params.id);
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
<<<<<<< HEAD
  async created() {
    let category = null;
    if (this.$store.getters.getCategories === null) {
      this.axios
        .get(this.$store.getters.getApiUrl + "category", {
          id: this.$route.params.id,
        })
        .then((response) => {
          this.category = response.data;
        });
    } else {
      category = this.$store.getters.getCategories.find(
        (item) => item.id === this.$route.params.id
      );
    }

    if (category) {
      this.category = category;
    }
  },
=======
>>>>>>> 774d5a4f19e0e83dabcc6be844cca292e4ca8928
};
</script>

<style></style>
