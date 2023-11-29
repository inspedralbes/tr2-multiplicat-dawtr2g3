<template>
    <div v-if="state.loading">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div>
            <h2>{{ partida.data[partida.actual].pregunta }}</h2>
        </div>
        <span v-for="(resposta, index) in partida.data[partida.actual].parametres.respostes">
            <Button :label="resposta" @click="respondre(index)"></Button> 
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            constants: {
                // API_URL: "https://api.github.com",
                numRespostesTest: 4,
            },
            state: {
                loading: true,
                error: false,
            },
            partida: {
                data: [],
                actual: 0,
            },
            
        };
    },
    methods: {
        /**
         * Fetches the data from the JSON file.
         
         */
        fetchData() {
            fetch("src/assets/json/rebre.json")
                .then((response) => response.json())
                .then((jsonData) => {
                    this.partida.data = jsonData;
                    this.state.loading = false;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    this.state.loading = false;
                    this.state.error = true;
                });
        },

        respondre(index) {
            if (index == 0) {
                if (this.partida.actual  == this.partida.data.length - 1) {
                    this.$router.push('/final');
                } else {
                    this.partida.actual++;
                }
            } else {
                this.partida.actual = 0;
            }
        }
    },

    mounted() {
        this.loading = true;
        this.fetchData();
    },
    created() {

    },

}
</script>

<style lang="scss" scoped></style>