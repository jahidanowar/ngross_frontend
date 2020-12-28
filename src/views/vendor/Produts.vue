<template>
  <div class="vendor-product mt-5">
    <v-container>
      <v-card v-for="(product, i) in vendorProduct" :key="i" class="mb-3">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div class="flex">
            <v-card-title>
              {{ product.title }}
            </v-card-title>
            <v-card-subtitle> ₹{{ parseInt(product.price) }} </v-card-subtitle>
            <v-card-actions>
              <div
                class="d-flex flex-no-wrap justify-space-between"
                style="width:100%"
              >
                <div class="flex flex-no-wrap justify-space-between">
                  <v-btn text color="primary">Stock {{
                    product.stock
                  }}</v-btn>
                </div>
                <v-spacer></v-spacer>
                <div class="text-right">
                  <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
                </div>
              </div>
            </v-card-actions>
          </div>
          <v-avatar size="125" tile>
            <v-img :src="product.image"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("vendorProducts");
  },
  computed: {
    vendorProduct() {
      return this.$store.getters.getVendorProduct;
    },
  },
};
</script>

<style></style>
