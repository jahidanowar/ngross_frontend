<template>
  <div class="vendor-orders mt-5">
    <v-container>
      <h2 class="mb-2">Recent Orders</h2>
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
  mounted() {
    this.$store.dispatch("vendorOrders");
  },
  computed: {
    orders() {
      return this.$store.getters.getVendorOrder;
    },
  },
};
</script>

<style></style>
