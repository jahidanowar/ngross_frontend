<template>
  <div class="order mt-5">
    <v-container>
      <v-card v-for="(order, i) in orders" :key="i" class="mb-5 py-2">
        <div class="card-body flex">
          <div>
            <p class="font-weight-bold"># {{ order.order_number }}</p>
          </div>
          <div>
            <p class="primary--text">Rs. {{ order.total_amount }}</p>
            <p><strong>Status: </strong> {{ order.status }}</p>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    axios
      .get(this.$store.getters.getApiUrl + "order", {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getToken}`,
        },
      })
      .then((response) => {
        this.orders = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
.card-body {
  padding: 0 16px;
}
</style>
