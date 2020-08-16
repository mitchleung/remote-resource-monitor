<template>
  <div class="glances">
    <div v-if="loading" class="loading">Loading ...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";
// import store from "../store"

export default {
  name: "Glances",
  props: {
    apiURL: String,
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  methods: {
    fetchData() {
      axios
        .get(this.apiURL)
        .then((response) => {
          this.$store.commit("setData", {
            cpu: Number(response.data.cpu.total),
            mem: (
              Number(response.data.mem.used / response.data.mem.total) *
              100
            ),
            memswap: (
              Number(response.data.memswap.used / response.data.memswap.total) *
              100
            ),
            percpu: response.data.percpu,
          });
          this.loading = false;
        })
        .catch((error) => console.log((this.error = error)));
    },
  },
  mounted() {
    this.loading = true;
    this.$options.interval = setInterval(this.fetchData, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
};
</script>

<style scoped lang="scss">
.glances {
  width: 100%;
}
</style>