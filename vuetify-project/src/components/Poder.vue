<template>
    <div class="container__power">
        <v-btn  @click="utilitzarPoder()" class="boton__power">
            <img v-if="poder == 'duelo'" src="../assets/poderes/duelo.png" alt="" class="power">
            <img v-else-if="poder == 'menysTemps'" src="../assets/poderes/reducirTiempo.png" alt="" class="power">
            <img v-else-if="poder == 'pararTemps'" src="../assets/poderes/pararTiempo.png" alt="" class="power">
            <img v-else-if="poder == 'escut'" src="../assets/poderes/escudo.png" alt="" class="power">
            <img v-else-if="poder == 'salut'" src="../assets/poderes/curar.png" alt="" class="power">
            <img v-else-if="poder == 'robarVida'" src="../assets/poderes/robarVida.png" alt="" class="power">
            <img v-else-if="poder == 'salt'" src="../assets/poderes/saltar.png" alt="" class="power">
            <img v-else src="../assets/icono/power.png" alt="" class="power">
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
    border-radius: 50%;
}
.boton__power {
    border-radius: 50%;
    width: 0;
    height: 0;
    display: flex;
    position: relative;
}

</style>