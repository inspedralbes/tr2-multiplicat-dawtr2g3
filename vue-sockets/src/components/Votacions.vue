<template>

<BotoVotacio :id="0" />
<BotoVotacio :id="1" />
<BotoVotacio :id="2" />
<BotoVotacio :id="3" />

<BarChart />

</template>
<script>
import { useAppStore } from "../stores/app.js";
import BotoVotacio from "./BotoVotacio.vue";
import BarChart from "./BarChart.vue";
export default {
  data() {
    return {
      votacions: []
    }
  },
  components: {
    BotoVotacio,
    BarChart,
},
  mounted() {
    const store = useAppStore();

    if (!store.isLoggedIn()) {
        alert("nu uh")
        this.$router.push("/")
    }
  },
  computed: {
    votos(){
      const store = useAppStore();
      this.votacions = store.getVotos();
    }
  }
}
</script>