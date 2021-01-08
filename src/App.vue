<template>
  <v-app>
    <app-bar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar"
export default {
  name: 'App',
  components: {
    AppBar  
  },
  data: () => ({
    //
  }),
  created(){
    this.axios.interceptors.request.use((config) => {
      console.log('loading');
      this.$store.commit('changeLoadingState', true);
      return config;
    }, (error) => {
      this.$store.commit('changeLoadingState', false);
      return Promise.reject(error);
    });

    this.axios.interceptors.response.use((response) => {
      this.$store.commit('changeLoadingState', false);
      return response;
    }, (error) => {
      this.$store.commit('changeLoadingState', false);
      return Promise.reject(error);
    });
  }
};
</script>
