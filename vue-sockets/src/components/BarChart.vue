<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>
  
<script>
// DataPage.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useAppStore } from "../stores/app.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    data() {
        return {
            chartOptions: {
                responsive: true
            },
        }
    },
    components: { Bar },
    computed: {
        chartData() {
            ['January', 'February', 'March'];
            [{ data: [40, 20, 12] }]
        },
        votos() {
            const store = useAppStore();
            return store.getVotos();
        }
    },
}
</script>
  

<style lang="scss" scoped></style>