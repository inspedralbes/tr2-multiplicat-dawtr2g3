<template>
    <div class="container__power">
        <v-btn  @click="utilitzarPoder()" class="boton__power">
            <img v-if="poder == 'duelo'" src="../assets/poderes/curar.jpg" alt="" class="power">
            <img v-else-if="poder == 'menysTemps'" src="../assets/poderes/curar.jpg" alt="" class="power">
            <img v-else-if="poder == 'pararTemps'" src="../assets/poderes/curar.jpg" alt="" class="power">
            <img v-else-if="poder == 'escut'" src="../assets/poderes/curar.jpg" alt="" class="power">
            <img v-else-if="poder == 'salut'" src="../assets/poderes/curar.jpg" alt="" class="power">
            <img v-else-if="poder == 'robarVida'" src="../assets/poderes/curar.jpg" alt="" class="power">
            <img v-else-if="poder == 'salt'" src="../assets/poderes/curar.jpg" alt="" class="power">
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
}
.boton__power {
    border-radius: 50%;
    width: 0;
    height: 0;
    display: flex;
    position: relative;
}

</style>