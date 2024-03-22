<template>
    <div class="container__power">
        <v-btn  @click="utilitzarPoder()" class="boton__power" :class="{ animate: isAnimating }">
            <img v-if="poder == 'duelo'" src="../assets/poderes/duelo.png" alt="" class="power">
            <img v-else-if="poder == 'menysTemps'" src="../assets/poderes/reducirTiempo.png" alt="" class="power">
            <img v-else-if="poder == 'pararTemps'" src="../assets/poderes/pararTiempo.png" alt="" class="power">
            <img v-else-if="poder == 'escut'" src="../assets/poderes/escudo.png" alt="" class="power">
            <img v-else-if="poder == 'vida'" src="../assets/poderes/curar.png" alt="" class="power">
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
                isAnimating: false
            };
        },
        methods: {
            utilitzarPoder() {
                this.$emit('utilitzarPoder');
                this.animateButton();
            },
            animateButton() {
                this.isAnimating = true;
                setTimeout(() => {
                    this.isAnimating = false;
                }, 1000); // same duration as the animation
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

@keyframes animateScale {
    0% {
        transform: scale(1) rotate(0deg);
    }
    50% {
        transform: scale(1.2) rotate(180deg);
    }
    100% {
        transform: scale(1) rotate(360deg);
    }
}

.animate {
    animation: animateScale 0.5s ease-in-out;
}

</style>