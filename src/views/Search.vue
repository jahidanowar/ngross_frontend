<template>
    <div class="search mt-5">
        <v-container>
            <v-text-field
                class="mt-3"
                name="key"
                label="Search here"
                id="key"
                prepend-inner-icon="mdi-magnify"
                v-model="key"
                outlined
            ></v-text-field>
            <new-product-grid :products="products" />
        </v-container>
    </div>
</template>

<script>
import NewProductGrid from '../components/NewProductGrid'
import {debounce as _debounce} from 'lodash';

export default {
    data(){
        return{
            key: ''
        }
    },
    components:{
        NewProductGrid
    },
    computed:{
        products(){
            return this.$store.getters['search/products']
        }
    },
    mounted(){
        // this.$store.dispatch("search/getProducts", "gold");
    },
    watch:{
        key:{
            handler: _debounce(function(key){
                console.log(key)
                if(this.key != ""){
                    this.$store.dispatch("search/getProducts", key);
                }
            }, 500),
        }
    }
}
</script>

<style>

</style>