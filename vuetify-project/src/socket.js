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
socket.on("llista partides", (arrayRoom) => {
  const store = useAppStore();
  store.setPartides(arrayRoom);

});
socket.on("update players", (playerArray) => {
  const store = useAppStore();
  store.setPlayers(playerArray);
});
socket.on("update chat", (msg) => {
  const store = useAppStore();
  store.pushChat(msg);
});

socket.on("lobby tencada", () => {
  const store = useAppStore();
  router.push('/partides');
});

socket.on("new question", (question) => {
  const store = useAppStore();
  store.setQuestion(question);
});

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

socket.on("end", () => {
  router.push('/final');
  const store = useAppStore();
  store.setQuestionIndex(-1);

});

socket.on("play", (question) => {
  const store = useAppStore();
  store.setQuestion(question);
  store.setAnswer(null);
  router.push('/partida');

});

