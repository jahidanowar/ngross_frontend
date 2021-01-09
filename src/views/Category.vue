<template>
  <div class="category mt-5">
    <v-container>
      <!-- Categories Section -->
      <v-row dense>
        <v-col v-for="(category, i) in categories" :key="i" cols="4" sm="2">
          <div
            class="category-blurb pa-1 rounded d-flex justify-center flex-column"
            @click="gotoCategory(category)"
          >
            <div class="align-self-center icon">
              🍪
            </div>
            {{ category.title }}
          </div>
        </v-col>
      </v-row>
      <!-- ./Categories Section -->
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {};
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
  },
  mounted() {
    if (this.$store.getters.getCategories === null) {
      this.$store.dispatch("setCategories");
    }
  },
  methods: {
    gotoCategory(category) {
      this.$router.push({
        name: "CategoryProducts",
        params: { id: category.id },
      });
    },
  },
};
</script>

<style></style>
