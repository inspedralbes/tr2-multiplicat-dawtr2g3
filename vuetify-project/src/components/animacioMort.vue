<template>
    <img src="../assets/backgrounds/background-general.png" class="fondo" alt="">
    <div class="animacio">
        <div class="death-background">
            <h1 >You died</h1>
        </div>
        <p class="text" :class="{'animacioText':animacioText}">Pots seguir jugant i ajudant a companys</p>
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
            animacioText: false
        };
    },
    components: {
    },
    methods: {

    },
    mounted() {
        setTimeout(() => {
            this.animacioText = true
        }, 5000);
    }
};
</script>
<style scoped>
@import url('https://fonts.cdnfonts.com/css/optimus-princeps');

.animacio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;


}
.text{
    font-size: 2em;
    color: white;
    font-family: OptimusPrinceps, sans-serif;
    letter-spacing: 5px;
    font-weight: 400;
    opacity: 0;
}
.animacioText{
    opacity: 1;
    z-index: 1;

    animation: fade-in 10s linear;
    
    
}
.fondo {
    position: absolute;
    width: 100%;
    height: 100%;
   animation: greyscale 5s linear;
    filter: grayscale(100%);
}

.death-background::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 69%, rgba(0, 0, 0, 1) 100%);
    position: absolute;
    top: 0;
    left: 0;


}

.death-background {
    background: black;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    opacity: 0.8;
    animation: fade-in 10s linear;

    * {
        color: #ff0000;
        font-family: OptimusPrinceps, sans-serif;
        letter-spacing: 5px;
        font-size: 8em;
        font-weight: 400;
        animation: fade-in 10s linear, text-zoom 5s linear;
    }
}


@keyframes greyscale {
    0% {
        filter: grayscale(0%);
    }

    100% {
        filter: grayscale(100%);
    }
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }

    25% {
        opacity: 0.65;
    }

    100% {
        opacity: 0.8;
    }
}

@keyframes text-zoom {
    0% {
        font-size: 5em;
    }

    25% {
        font-size: 6em;
    }

    50% {
        font-size: 7em;
    }

    75% {
        font-size: 8em;
    }

    100% {
        font-size: 8em;
    }
}</style>