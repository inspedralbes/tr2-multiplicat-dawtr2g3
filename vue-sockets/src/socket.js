import { io } from "socket.io-client";
import { useAppStore } from '@/stores/app';

import router from '@/router'; // Import the router from your project
// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3000";

export const socket = io(URL);

socket.on("update players", (playerArray) => {
  const store = useAppStore();
  console.log(playerArray);
  store.setPlayers(playerArray);
});
socket.on("update chat", (msg) => {
  const store = useAppStore();
  store.pushChat(msg);
});
socket.on("new question", (question) => {
  const store = useAppStore();
  store.setQuestion(question);
});

socket.on("check", (answer, acabat) => {
  const store = useAppStore();
  console.log(answer);
  store.setAnswer(answer);
  if (acabat) {
    router.push('/final');
  };
});
socket.on("end", () => {
  router.push('/final');

});

socket.on("play", (question) => {
  const store = useAppStore();
  console.log('play');
  store.setQuestion(question);
  store.setAnswer(null);
  router.push('/partida');
  
});

