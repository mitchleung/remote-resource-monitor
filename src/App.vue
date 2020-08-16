<template>
  <div id="app">
    <div class="grid">
      <div class="grid__cell" v-for="(percpu) in this.$store.state.percpu" v-bind:key="percpu.cpu_number">
        <CircleChart 
          :displayValue="percpu.total" 
          :label="'CPU '+ (percpu.cpu_number + 1)" 
        />
      </div>
      <div class="grid__cell">
        <CircleChart 
          :displayValue="this.$store.state.cpu" 
          label="CPU" 
        />
      </div>
      <div class="grid__cell">
        <CircleChart 
          :displayValue="this.$store.state.mem" 
          label="Memory" 
        />
      </div>
      <Glances apiURL="http://192.168.1.7:61208/api/3/all" />
    </div>
  </div>
</template>

<script>
import CircleChart from "./components/CircleChart.vue";
import Glances from "./components/Glances.vue";

export default {
  name: "App",
  components: {
    CircleChart,
    Glances,
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // margin-top: 60px;
  width: 100vw;
  height: 100vh;
  .grid {
    display: flex;
    flex-wrap: wrap;
    &__cell {
      flex: 25%;
    }
  }
}
</style>
