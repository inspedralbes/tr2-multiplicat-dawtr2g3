<template>
    <div class="centrarX">
        <h1>GUANYADOR</h1>
        <h1>{{ guanyador.nick }}</h1>

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
    </div>
</template>

<script>
import { useAppStore } from "../store/app.js";
import { computed } from 'vue';
import JSConfetti from 'js-confetti'

export default {
        name: 'FinalTorneig',
        data() {
            const store = useAppStore();
            return {
                guanyador: computed(() => store.getGuanyador()),
            }
        },
        methods: {
            // Funcions
        },
        mounted() {
            const confetti = new JSConfetti()
            window.setInterval(() => {
                if (Math.floor(Math.random() * 10) < 1){
                    confetti.addConfetti()
                }
            }, 100)
            
        }
    }
</script>

<style lang="scss" scoped>

.centrarX {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}

// .centrarX * {
//     align-items: center;
// }

</style>