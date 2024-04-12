import { io } from "socket.io-client";
import { useAppStore } from '@/store/app';

import router from '@/router'; // Import the router from your project
import JugadorPartida from "./components/JugadorPartida.vue";
// "undefined" means the URL will be computed from the `window.location` object

// const socketURL = import.meta.env.VITE_URL_SOCKETS;
const socketURL = "http://mathroyale.daw.inspedralbes.cat:3589";



export const socket = io(socketURL, {
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


socket.on('finalitzar duelo', () => {
  const store = useAppStore();
  store.setDuelo({});
  store.stopTimer();

  socket.emit('sortir duelo');
});
socket.on('win', () => {
  const store = useAppStore();
  store.setGuanyat(true);
  store.setTourneigState("esperant");
  store.stopTimer();
});

socket.on('lose', () => {
  const store = useAppStore();
  store.setPerdut(true);
  store.setTourneigState("esperant");
  store.stopTimer();
});

socket.on('start match', (question) => {
  const store = useAppStore();
  store.setQuestion(question);
  store.setTourneigState("partida");
  store.canvi = true;
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
  store.players = [];
  store.enPartida = false;

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

socket.on("new question torneig", (question) => {
  const store = useAppStore();
  store.setQuestion(question);
  store.canvi = true;
});

/**
 * Guarda si la resposta es correcte i si la partida no ha acabat
 */
socket.on("check", (correcte, acabat) => {
  const store = useAppStore();
  store.setAnswer(correcte);

  store.setAnswer(correcte);
  if (!correcte) {
    store.triggerAnimacioVida();
  }
  if (!acabat && correcte) {
    if (store.getDuelo()) {
      let victories = store.sumarVictoria();
      if (victories == 3) {
        store.setVictories(0);
        socket.emit("end duel");
      }
    }
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
  store.nuke = false;
  store.stopTimer();
  store.enPartida = false;
  store.timer = 20;
  store.dead = false;
  store.duelo = {};
  store.animacionDuelo = false;
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

socket.on('info partida', (nom, maxJugadors) => {
  const store = useAppStore();
  store.setInfoPartida(nom, maxJugadors);
})
socket.on('push a lobby', () => {
  router.push('/lobby');

});

/**
 * Mou a la pantalla de la partida
 */
socket.on("play", (question) => {
  const store = useAppStore();
  store.stopTimer();
  store.setQuestion(question);
  store.setAnswer(null);
  store.timer = question.temps;
  store.enLobby = false;
  store.enPartida = true;
  router.push('/partida');
  store.startTimer();
});

socket.on("duelo recibir", (duelo) => {
  //Triger animacion de recibir duelo
  const store = useAppStore();
  store.dialog = false;

  socket.emit("duelo entrar", store.ownPlayer.idSocket, duelo.oponent.id)
  store.setDuelo(duelo);
  store.animacionDuelo = true;
  setTimeout(() => {
    store.animacionDuelo = false;
  }, 3000);
});

socket.on("duelo enviar", (duelo) => {
  //Triger animacion de enviar duelo
  const store = useAppStore();


  socket.emit("duelo entrar", duelo.oponent.id, store.ownPlayer.idSocket);

  store.setDuelo(duelo);
  store.animacionDuelo = true;
  setTimeout(() => {
    store.animacionDuelo = false;
  }, 3000);
});
socket.on('nuke', (nick) => {
  const store = useAppStore();
  store.nukeAnimation = nick;
  store.stopTimer();
  setTimeout(() => {
    store.nukeAnimation = false;
    store.startTimer();
  }, 5000);
})
socket.on('pregunta nuke', (pregunta) => {
  const store = useAppStore();
  store.question = pregunta;
  store.question.pregunta = store.question.enunciat
  store.timer = 10;
  store.startTimer();
  store.nuke = true;
});

socket.on('tournament info', (info) => {
  const store = useAppStore();

  let { data, players } = info;

  data.participant.forEach((jugador, index) => {
    jugador.name = players[index].nick;
    jugador.avatar = players[index].avatar;
  });

  store.enLobby = false;
  store.enPartida = true;
  store.setPlayers(players);
  store.setTorneigInfo(data);
  router.push('/torneigProfe');
});

socket.on("new matchup", (arrayUsers) => {
  const store = useAppStore();
  store.enPartida = true;
  store.enLobby = false;

  let myself = arrayUsers.find(user => user.idSocket == socket.id);
  store.setOwnPlayer(myself);
  store.setTourneigState("matchup");
  router.push('/torneig');
});

socket.on("lose tournament", () => {
  router.push('/perdut');

});

socket.on("end tournament", (guanyador) => {
  const store = useAppStore();
    store.enPartida = false;

  store.setGuanyador(guanyador);
  router.push('/finalTorneig');
})

// socket.on("get power", (poder) => {
//   const store = useAppStore();
//   store.setPower(poder);
// });

