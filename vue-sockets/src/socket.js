import { io } from "socket.io-client";
import { useAppStore } from '@/stores/app';
import router from '@/router'; // Import the router from your project
// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://provasocket.daw.inspedralbes.cat:3113";

export const socket = io(/**URL**/);

socket.on("update players", (playerArray) => {
  const store = useAppStore();
  store.setPlayers(playerArray);
});

socket.on("question",(question) => {
  const store = useAppStore();
  store.setQuestion(question);
});

socket.on("checkAnswer",(answer) => {
  const store = useAppStore();
  store.setAnswer(answer);
});

socket.on("startGame",(question) => {
  const store = useAppStore();
  store.setQuestion(question);
  router.push('/partida'); 
});

