<template>
      <iconsHead></iconsHead>

    <div class="grid">
        <h1 class="grid__titol">GUANYADOR</h1>
        <h1 class="grid__nom">{{ guanyador.nick }}</h1>

        <div class="grid__img">
            <img v-if="guanyador.avatar == 1" class="avatar" src="../assets/avatar/avatarVaiolet.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 2" class="avatar" src="../assets/avatar/avatarCerdo.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 3" class="avatar" src="../assets/avatar/avatarEric.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 4" class="avatar" src="../assets/avatar/avatarGatoSuperman.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 5" class="avatar" src="../assets/avatar/avatarHamsterTrex.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 6" class="avatar" src="../assets/avatar/avatarHombrePeloBlanco.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 7" class="avatar" src="../assets/avatar/avatarLevie.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 8" class="avatar" src="../assets/avatar/avatarMikasa.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 9" class="avatar" src="../assets/avatar/avatarMujerPeloRojo.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 10" class="avatar" src="../assets/avatar/avatarPerroBatman.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 11" class="avatar" src="../assets/avatar/avatarPerroDJ.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 12" class="avatar" src="../assets/avatar/avatarPower.png" alt="icono avatar">
            <img v-else-if="guanyador.avatar == 13" class="avatar" src="../assets/avatar/avatarZorro.png" alt="icono avatar">
            <img class="medalla" src="../assets/altres ilustracions/medalla.png" alt="Medalla d'or">
        </div>
    </div>
</template>

<script>
import { useAppStore } from "../store/app.js";
import { computed } from 'vue';
import iconsHead from './iconesHead.vue';
import JSConfetti from 'js-confetti';

export default {
    components: {
        iconsHead,
    },
    name: 'FinalTorneig',
    data() {
        const store = useAppStore();
        return {
            interval: null,
            guanyador: computed(() => store.getGuanyador()),
        }
    },
    methods: {
        // Funcions
    },
    mounted() {
        const confetti = new JSConfetti()
        this.interval = setInterval(() => {
            if (Math.floor(Math.random() * 10) < 1){
                confetti.addConfetti()
            }
        }, 100)
        
    },
    beforeUnmount() {
        clearInterval(this.interval)
    }
}
</script>

<style lang="scss" scoped>

.medalla {
    width: 250px;
    position: absolute;
    top: 33vh;
    left: 52vw;
}

.grid {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 4fr 1fr;
    height: 100vh;
}

.grid > * {
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid__titol {
    font-family: "Battle Beasts";
    font-size: 10rem !important;
    font-weight: 300;
    text-transform: none !important;
    background: -webkit-linear-gradient(#fffd95, #c49301);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

}

.grid__nom {
    grid-row: 2;
    font-size: 5em;
    background: -webkit-linear-gradient(#fffd95, #c49301);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

}

.grid__img {
    grid-row: 3;
    position: relative;
}

// .centrarX * {
//     align-items: center;
// }

</style>