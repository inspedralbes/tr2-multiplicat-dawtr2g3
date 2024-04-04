<template>
    <h1>ASD</h1>
    <div class="avatarJugador">
        <img class="avatar" src="../assets/avatar/avatarVaiolet.png" alt="icono avatar">
        <img v-if="ownPlayer.avatar == 2" class="avatar" src="../assets/avatar/avatarCerdo.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 3" class="avatar" src="../assets/avatar/avatarEric.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 4" class="avatar" src="../assets/avatar/avatarGatoSuperman.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 5" class="avatar" src="../assets/avatar/avatarHamsterTrex.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 6" class="avatar" src="../assets/avatar/avatarHombrePeloBlanco.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 7" class="avatar" src="../assets/avatar/avatarLevie.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 8" class="avatar" src="../assets/avatar/avatarMikasa.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 9" class="avatar" src="../assets/avatar/avatarMujerPeloRojo.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 10" class="avatar" src="../assets/avatar/avatarPerroBatman.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 11" class="avatar" src="../assets/avatar/avatarPerroDJ.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 12" class="avatar" src="../assets/avatar/avatarPower.png"
            alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 13" class="avatar" src="../assets/avatar/avatarZorro.png"
            alt="icono avatar">
        <h1>Loris</h1>
    </div>

    <div class="iconoVersus">
        <img src="../assets/icono/versus.png" alt="icono versus">
    </div>


    <div class="avatarOponent">
        <h1>Arnau</h1>

        <img class="avatar" src="../assets/avatar/avatarVaiolet.png"
            alt="icono avatar">
        <img v-if="duelo.oponent.avatar == 2" class="avatar" src="../assets/avatar/avatarCerdo.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 3" class="avatar" src="../assets/avatar/avatarEric.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 4" class="avatar" src="../assets/avatar/avatarGatoSuperman.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 5" class="avatar" src="../assets/avatar/avatarHamsterTrex.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 6" class="avatar" src="../assets/avatar/avatarHombrePeloBlanco.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 7" class="avatar" src="../assets/avatar/avatarLevie.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 8" class="avatar" src="../assets/avatar/avatarMikasa.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 9" class="avatar" src="../assets/avatar/avatarMujerPeloRojo.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 10" class="avatar" src="../assets/avatar/avatarPerroBatman.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 11" class="avatar" src="../assets/avatar/avatarPerroDJ.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 12" class="avatar" src="../assets/avatar/avatarPower.png"
            alt="icono avatar">
        <img v-else-if="duelo.oponent.avatar == 13" class="avatar" src="../assets/avatar/avatarZorro.png"
            alt="icono avatar">
    </div>
</template>
<script>
import { useAppStore } from "../store/app.js";
import { computed } from "vue";

export default {
    name: "Torneig",
    data() {
        const store = useAppStore();
        return {
            state: computed(() => store.getTourneigState()),
            ownPlayer: computed(() => store.getOwnPlayer()),
            duelo: computed(() => store.getDuelo()),
        };
    },
    components: {
    },
    methods: {

    },
    mounted() {
        
    }
};
</script>
<style scoped>
.pantallaVersus {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 0.5fr 1fr;
    justify-content: center;
    align-items: center;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    overflow: hidden;
}
.pantallaVersus::-webkit-scrollbar {
    display: none;
}

.fondo{
    overflow: hidden;

    position: absolute;
    top: 0;
    left: 0;
    width: 95vw;
    height: 95vh;
    z-index: -1;
    opacity: 0.9;
    object-fit: cover;
    object-position: center;
    background-color: black;
    filter: blur(4px);
    transform: scale(1.1);
    
    
}
.fondo::-webkit-scrollbar {
    display: none;
}
.avatarJugador {
    grid-column: 1;
    grid-row: 1/4;
    justify-self: center;
    align-self: center;
}

.pantallaVersus * h1 {
    background-color: rgb(255, 255, 255);
    border-radius: 50px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    margin: auto;
}

.iconoVersus {
    grid-column: 2;
    grid-row: 2/5;
    justify-self: center;
    align-self: center;
}

.avatarOponent {
    grid-column: 3;
    grid-row: 3/-1;
    justify-self: center;
    align-self: center;
}

.esperant {
    grid-column: 3;
    justify-self: center;
    align-self: center;
}

.iconoVersus img {
    height: 50vh;
    width: 50vh;
}

.avatar {
    width: 50vh;
    height: 5%;
}
.avatar1{
    animation: avatar1 2s ease-in-out;

}
@keyframes avatar1 {
    0% {
        transform: translateX(-100%);
    }
    
    65% {
        transform: translateX(0%);
    }
  
}
.avatar2{
    animation: avatar2 2s ease-in-out;

}
@keyframes avatar2 {
    0% {
        transform: translateX(100%);
    }
    
    65% {
        transform: translateX(0%);
    }
    
}
</style>