<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-card-title>
        <span>Edit Product</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateProduct">
          <v-text-field
            name="title"
            label="Product Name"
            id="price"
            v-model="product.title"
          ></v-text-field>
          <v-text-field
            name="price"
            label="Product Price"
            id="price"
            v-model="product.price"
          ></v-text-field>
          <v-text-field
            name="stock"
            label="Stock"
            id="stock"
            v-model="product.stock"
          ></v-text-field>
          <v-btn type="submit" block color="primary" dark>Update</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  name: "EditProduct",
  props: {
    product: {
      type: Object,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updateProduct() {
      console.log(this.product);
      let newProduct = {
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        stock: this.product.stock,
      };

      axios
        .patch(this.$store.getters.getApiUrl + "vendor/product", newProduct, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$emit("close");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
