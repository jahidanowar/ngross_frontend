<template>
  <div class="vendor-orders mt-5">
    <v-container>
      <div class="d-flex flex-no-wrap justify-space-between align-center mb-2">
        <h2>Orders</h2>
        <div>
          Hourly Orders
          <v-btn-toggle v-model="filterOrder" color="primary accent-3" group dense>
            <v-btn value="1">
              1
            </v-btn>
            <v-btn value="6">
              6
            </v-btn>
            <v-btn value="12">
              12
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <v-card v-for="(order, i) in orders" :key="i" class="mb-3">
        <v-card-title primary-title>
          {{ order.product_name }}
        </v-card-title>
        <v-card-text>
          <span>Quantity {{ order.quantity }}</span>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "VendorOrder",
  mounted() {
    this.$store.dispatch("vendorOrders");
  },
  data(){
    return{
      filterOrder: undefined
    }
  },
  computed: {
    orders() {
      return this.$store.getters.getVendorOrder;
    },
  },
  watch:{
    filterOrder(){
      this.filterOrder !== undefined ? this.$store.dispatch('filterVendorOrders', this.filterOrder) : this.$store.dispatch('vendorOrders');
    }
  }
};
</script>

<style></style>
