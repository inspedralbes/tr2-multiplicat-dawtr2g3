<template>
  <iconsHead></iconsHead>
  <div class="page-final">
    <h1 class="title-final">Final de la partida</h1>
    <div class="container-boxes">
      <div class="box-losers">
        <h2 class="title-losers">Perdedors</h2>
        <div class="container-llista-jugadors">
          <ul class="llista-jugadors">
            <li class="jugador" v-for="(jugador, index) in perdedors">
              <span class="name-jugador">{{ jugador.nick }}</span>
              <p class="btn-eliminar">Temps aguantat: {{ jugador.temps % 1000 / 10 }}s</p>
            </li>
          </ul>
        </div>
        <!-- <div class="jugador" v-for="(jugador, index) in perdedors">
          <span>Jugador: {{ jugador.nick }}</span> <div>Temps aguantat: {{ jugador.temps % 1000 / 10 }}s</div>
        </div> -->
      </div>
      <div class="box-winner">
        <h2 class="title-winner">Guanyador</h2>
        <p class="name-winner">{{ guanyador.nick }}</p>
        <div class="columna-winner">
          <img class="image-columna-winner" src="../assets/altres ilustracions/medalla.png" width="150">
        </div>
      </div>
    </div>
    <button class="btn-tornarJugar" @click="$router.push('/');">Tornar a jugar</button>
  </div>
</template>

<style scoped>
.page-final {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-final {
  font-size: 6vw;
  letter-spacing: 1rem;
  margin-bottom: 5vh;
  font-family: "Battle Beasts";
  color: #fcbf09;
  height: 5vh;
  margin-top: 5vh;
}

.btn-tornarJugar {
  font-size: 3vw;
  color: rgba(252, 191, 9, 1);
  font-family: 'Battle Beasts';
  border-radius: 50px 50px 0px 0px;
  border: 1px solid rgba(252, 191, 9, 1);
  background-color: rgba(70, 23, 143, 1);
  padding: 2rem;
  padding-bottom: 0rem;
  padding-top: 0rem;

  position: absolute;
  bottom: 0px;
}

.container-boxes {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.box-losers {
  width: 50vw;
  height: 85vh;
  display: grid;
  place-items: center;;
}

.container-llista-jugadors {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27vw;
  height: 50vh;
  overflow-y: scroll;
  /* position: absolute;
  bottom: 10vh; */
}

.container-llista-jugadors::-webkit-scrollbar {
  width: 0vw;
}

.llista-jugadors {
  list-style: none;
}

.jugador {
  width: 20vw;
  height: 7vh;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  border: 1px 0px 0px 0px solid rgb(255, 255, 255);
}

.name-jugador {
  /* estils */
  color: rgb(255, 255, 255);
  font-size: 1.5vw;
  /* alineació */
  text-align: left;
  margin-left: 1.2vw;
  margin-right: 1.8vw;
}

.btn-eliminar {
  /* estils */
  color: rgba(255, 172, 0, 1);
  font-size: 1vw;
  /* alineació */
  display: inline;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  margin-left: 2vw;
}

.jugador:hover {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 60px;
}

.box-winner {
  width: 50vw;
  height: 85vh;
  display: grid;
  place-items: center;
}

.title-losers {
  position: absolute;
  bottom: 65vh;
  font-size: 3vw;
  letter-spacing: 1rem;
  margin-bottom: 2rem;
  font-family: "Battle Beasts";
  color: #ff3355;
  text-shadow: 1px 1px 0.2rem #c50928;
}

.title-winner {
  position: absolute;
  bottom: 65vh;
  font-size: 3vw;
  letter-spacing: 1rem;
  margin-bottom: 2rem;
  font-family: "Battle Beasts";
  color: #67be39;
  text-shadow: 1px 1px 0.2rem #106b03;
}

.name-winner {
  font-size: 2.3vw;
  color: white;
  position: absolute;
  bottom: 52vh;
}

.columna-winner {
  position: absolute;
  bottom: 0px;
  width: 15vw;
  height: 50vh;
  background-color: rgba(250, 208, 158, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2), 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
  align-content: center;
}

.image-columna-winner {
  width: 7vw;
  margin-left: 4.3vw;
  margin-right: 3.7vw;
  top: 1vh;
}
</style>

<script>
import { useAppStore } from "../store/app.js";
import { computed } from 'vue';
import router from '@/router'

import iconsHead from './iconesHead.vue';

export default {
  components: {
    iconsHead,
  },
  data() {
    const store = useAppStore();
    return {
      guanyador: computed(() => store.guanyador),
      perdedors: computed(() => store.perdedors),
    };
  },
  methods: {
    tornar() {
      router.push('/');
    }
  },

  mounted() {

  },
  created() {

  },

}
</script>
