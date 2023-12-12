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
socket.on("llista partides", (arrayRoom) => {
  const store = useAppStore();
  store.setPartides(arrayRoom);

});

/**
 * Modifica l'array d'usuaris
 */
socket.on("update players", (playerArray) => {
  console.log(playerArray);
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
socket.on("lobby tencada", () => {
  const store = useAppStore();
  router.push('/partides');
});

/**
 * Guarda la pregunta
 */
socket.on("new question", (question) => {
  const store = useAppStore();
  store.setQuestion(question);
});

/**
 * Guarda si la resposta es correcte i si la partida  no ha acabat
 */
socket.on("check", (correcte, acabat) => {
  const store = useAppStore();
  store.setAnswer(correcte);
  console.log("correcte", correcte);
  console.log("acabat", acabat);
  if (!acabat && correcte) {
    socket.emit("send");

    console.log('NO ACABAT');
  }
  if(acabat){
    console.log('ACABAT');
    router.push('/final');
  }
});

/**
 * Mou a la pantalla final
 */
socket.on("end", () => {
  router.push('/final');
  const store = useAppStore();
  store.setQuestionIndex(-1);

});

/**
 * Mou a la pantalla de la partida
 */
socket.on("play", (question) => {
  const store = useAppStore();
  store.setQuestion(question);
  store.setAnswer(null);
  router.push('/partida');

});

// socket.on("get power", (poder) => {
//   const store = useAppStore();
//   store.setPower(poder);
// });

