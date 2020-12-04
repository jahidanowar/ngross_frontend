<template>
  <div class="cart mt-5">
    <v-container>
      <div class="d-flex flex-no-wrap justify-space-between align-center mb-2">
        <h2>Cart</h2>
        <div>
          <v-btn color="primary" outlined>Place Order</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <v-row>
        <v-col v-for="i in 10" :key="i" cols="12" sm="6">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="flex">
                <v-card-title>
                  Product Name
                </v-card-title>
                <v-card-subtitle>
                  $123
                </v-card-subtitle>
                <v-card-actions>
                  <div
                    class="d-flex flex-no-wrap justify-space-between"
                    style="width:100%"
                  >
                    <div class="flex flex-no-wrap justify-space-between">
                      <v-btn flat icon color="primary">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <v-btn flat icon color="primary">12</v-btn>
                      <v-btn flat icon color="primary">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="text-right">
                      <v-btn icon color="error"
                        ><v-icon>mdi-delete</v-icon></v-btn
                      >
                    </div>
                  </div>
                </v-card-actions>
              </div>
              <v-avatar size="125" tile>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
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
            <h2 class="secondary--text font-weight-bold">₹ 12233</h2>
          </div>
          <v-btn color="primary" elevation="0">Place Order</v-btn>
        </div>
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
  methods: {},
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
