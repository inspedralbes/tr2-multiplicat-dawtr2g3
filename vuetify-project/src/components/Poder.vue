<template>
    <div class="container__power">
        <v-btn  @click="utilitzarPoder()" class="boton__power">
            <img src="../assets/icono/power.png" alt="" class="power">
        </v-btn>
    </div>
</template>

<script>

    export default {
        name: "Poder",
        props: {
            poder: {
                type: String,
                required: true
            }
        },
        data() {
            return {

            };
        },
        methods: {
            utilitzarPoder() {
                this.$emit('utilitzarPoder');
            }
        }
    };
</script>

<style lang="scss" scoped>

.power {
    width: 10vw;
    height: 10vw;
}
.boton__power {
    border-radius: 50%;
    width: 0;
    height: 0;
    display: flex;
    position: relative;
}

</style>