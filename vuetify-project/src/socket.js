import { io } from "socket.io-client";
import { useAppStore } from '@/store/app';

import router from '@/router'; // Import the router from your project
// "undefined" means the URL will be computed from the `window.location` object
/**
 * Si estas treballant en local ferem  url =localhost:3000
 * Si estas en producció ferem url = http://mathroyale.daw.inspedralbes.cat:3000
 */
const URL = "http://localhost:3000";

export const socket = io(URL, {
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});

/**
 * Guarda la llista de partides
 */
socket.on("games list", (arrayRoom) => {
  const store = useAppStore();
  store.setPartides(arrayRoom);

});

/**
 * Modifica l'array d'usuaris
 */
socket.on("update players", (playerArray) => {
  const store = useAppStore();
  store.setPlayers(playerArray);
});

/**
 * Envia el missatge al chat
 */
socket.on("update chat", (msg) => {
  const store = useAppStore();
  store.pushChat(msg);
});

/**
 * Mou a la pantalla de la partida
 */
socket.on("closed lobby", () => {
  const store = useAppStore();
  router.push('/partides');
  store.stopTimer();
});

/**
 * Guarda la pregunta
 */
socket.on("new question", (question) => {

  const store = useAppStore();
  store.stopTimer();
  store.setQuestion(question);
  store.timer = question.temps;
  store.startTimer();
  store.canvi = true;
});

/**
 * Guarda si la resposta es correcte i si la partida no ha acabat
 */
socket.on("check", (correcte, acabat) => {
  const store = useAppStore();
  store.setAnswer(correcte);

  store.setAnswer(correcte);
  if(!correcte){
    store.triggerAnimacioVida();
  }
  if (!acabat && correcte) {
    socket.emit("send");
  }
  if (acabat) {
    store.stopTimer();
    router.push('/final');
  }
});


/**
 * Mou a la pantalla final
 */
socket.on("end", (guanyador, perdedors) => {
  router.push('/final');
  const store = useAppStore();
  store.stopTimer();
  store.timer = 20;

  store.setQuestionIndex(-1);
  store.setGuanyador(guanyador);
  store.setPerdedors(perdedors);
});

socket.on('parar temps', () => {
  const store = useAppStore();
  store.stopTimer();
  setTimeout(() => {
    store.startTimer();
  }, 4000);
});

socket.on('die', () => {
  const store = useAppStore();
  store.stopTimer();
  store.timer = 20;
  store.playerDead();
});

socket.on('info partida', (nom, maxJugadors) =>{
  const store = useAppStore();
  store.setInfoPartida(nom,maxJugadors);
})

/**
 * Mou a la pantalla de la partida
 */
socket.on("play", (question) => {
  const store = useAppStore();
  store.stopTimer();
  store.setQuestion(question);
  store.setAnswer(null);
  store.timer = question.temps;
  router.push('/partida');
  store.startTimer();
});

// socket.on("get power", (poder) => {
//   const store = useAppStore();
//   store.setPower(poder);
// });

