<template>
  <div class="thankyou my-auto text-center">
      <img src="../assets/shopping-cart.png" alt="Order Placed" lazy width="100px" style="display:block; margin:0 auto">
      <h3 class="mt-5">Wohoo!<br/> Your Order has been Placed 🎉</h3>
      <h3 class="mt-5 primary--text font-weight-bold" style="letter-spacing:2px">{{orderId}}</h3>
      <v-btn class="mt-5" color="primary" to="/order">View Orders</v-btn>
  </div>
</template>

<script>
export default {
    computed:{
        orderId(){
            return this.$route.params.orderId || ""
        }
    }
}
</script>

<style>

</style>