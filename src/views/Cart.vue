<template>
  <div :class="{'my-auto':cart.length == 0 }">
    <div v-if="cart.length != 0" class="cart mt-5">
      <v-container>
        <div
          class="d-flex flex-no-wrap justify-space-between align-center mb-2"
        >
          <h2>Cart</h2>
          <div>
            <v-btn color="primary" outlined>Place Order</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <v-row class="mb-12">
          <v-col v-for="(cartItem, i) in cart" :key="i" cols="12" sm="6">
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div class="flex">
                  <v-card-title>
                    {{cartItem.title}}
                  </v-card-title>
                  <v-card-subtitle>
                    ₹{{parseInt(cartItem.price) * parseInt(cartItem.quantity)}}
                  </v-card-subtitle>
                  <v-card-actions>
                    <div
                      class="d-flex flex-no-wrap justify-space-between"
                      style="width:100%"
                    >
                      <div class="flex flex-no-wrap justify-space-between">
                        <v-btn text icon color="primary" @click="decreaseCartItemQuantity(cartItem.id)">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn text icon color="primary">{{cartItem.quantity}}</v-btn>
                        <v-btn text icon color="primary" @click="increaseCartItemQuantity(cartItem.id)">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                      <v-spacer></v-spacer>
                      <div class="text-right">
                        <v-btn icon color="error" @click="deleteCartItem(cartItem, i)"
                          ><v-icon>mdi-delete</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-card-actions>
                </div>
                <v-avatar size="125" tile>
                  <v-img
                    :src="cartItem.image"
                  ></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="bottom-bar">
        <v-container>
          <div
            class="d-flex flex-no-wrap justify-space-between align-center"
            style="width:100%"
          >
            <div>
              <h2 class="secondary--text font-weight-bold">₹{{total}}</h2>
            </div>
            <v-btn color="primary" elevation="0" @click="checkout">Place Order</v-btn>
          </div>
        </v-container>
      </div>
    </div>
    <div v-else class="cart cart-empty my-auto">
      <v-container class="text-center">
        <h2 class="font-weight-bold">Empty Cart</h2>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {};
  },
  computed: {
    cart() {
      return this.$store.getters.cartProducts
    },
    total(){
      return this.$store.getters.cartTotal
    }
  },
  methods: {
    deleteCartItem(cartItem, i){
      this.$store.commit("deleteCartItem", {index: i, price: cartItem.price, quantity:cartItem.quantity})
    },
    increaseCartItemQuantity(id){
      this.$store.dispatch('incrementItemQuantity', id)
    },
    decreaseCartItemQuantity(id){
      this.$store.dispatch('decrementItemQuantity', id)
    },
    checkout(){
      this.$store.dispatch('checkout')
    }
  },
};
</script>

<style lang="scss">
.bottom-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>
