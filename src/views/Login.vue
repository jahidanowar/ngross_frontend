<template>
  <div class="login my-auto">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="mx-auto">
          <v-card class="pa-5 text-center">
            <img src="../assets/user.svg" alt="Login" style="width:120px" />
            <v-form @submit.prevent="login">
              <v-text-field
                name="username"
                label="Enter your phone or email"
                id="username"
                v-model="loginForm.username"
              ></v-text-field>
              <v-text-field
                name="password"
                label="Enter your password"
                min="6"
                type="password"
                v-model="loginForm.password"
              ></v-text-field>
              <v-btn block color="primary" dark type="submit">Login</v-btn>
            </v-form>
          </v-card>
          <v-spacer></v-spacer>
          <v-snackbar v-model="showError">
            {{ error.message }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="showError = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      showError: false,
      error: {},
    };
  },
  methods: {
    login() {
      console.log(
        "Login Pressed:" +
          this.loginForm.username +
          " " +
          this.loginForm.password
      );

      if (this.loginForm.username == "") {
        this.error = { message: "Username is Empty" };
        this.showError = true;
        return;
      } else if (this.loginForm.password == "") {
        this.error = { message: "Password is Empty" };
        this.showError = true;
        return;
      }

      axios
        .post(this.$store.state.apiUrl + "login", this.loginForm)
        .then((response) => {
          console.log(response.data);
          const token = response.data["token"];
          const user = response.data["user"];
          localStorage.setItem("user-token", token);
          // Requesting user data
          this.$store.commit("setUser", { token: token, user: user });
          if (user.user_type === "vendor") {
            this.$router.push("/vendor/order");
          } else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          localStorage.removeItem("user-token");
          if (error.response) {
            this.error = error.response.data;
            this.showError = true;
          }
        });
    },
  },
};
</script>

<style></style>
