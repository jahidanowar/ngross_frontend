<template>
  <div class="login my-auto">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="mx-auto">
          <v-card class="pa-5 text-center">
            <img src="../assets/user.svg" alt="Login" style="width:120px">
            <v-form>
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
              <v-btn block color="primary" dark @click="login">Login</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
      return{
          loginForm:{
              username:'',
              password:''
          }
      }
  },
  methods:{
      login(){
          console.log('Login Pressed')
      }
  }
};
</script>

<style></style>
