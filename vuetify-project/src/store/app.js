import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { socket } from '../socket';
export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
      token: '',
      verificat: false,
    },
    nukeAnimation: false,
    guanyador: {},
    perdedors: [],
    partides: [],
    chat: [],
    nomPartida: '',
    maxJugadors: 0,
    players: [],
    ownPlayer: null,
    question: null,
    answer: null,
    timer: 20,
    questionIndex: -1,
    timerInterval: null,
    dead: false,
    animacioVida: false,
    animacioMort: false,
    avatar: 1,
    timerStopped: true,
    tutorial: false,
    enPartida: false,
    enLobby: false,
    dialog: false,
    animacionDuelo: false,
    guanyat: false,
    perdut: false,
    duelo: {
      enDuelo: false,
      encertades: 0,
      indexPreg: [],
      oponent: {
        id: "",
        encertades: "",
        avatar: "",
        nick: "",
      },
    },
    infoTorneig: null,
    stateTorneig: "esperant",


  }),
  persist: {
    paths: ['loginInfo', 'tutorial', 'avatar']
  },
  actions: {
    setTutorial(tutorial) {
      this.tutorial = tutorial;
    },
    setOpponent(opponent) {
      this.opponent = opponent;
    },
    getPantalla() {
      return this.pantallaTorneig;
    },
    logout() {
      this.loginInfo = {
        loggedIn: false,
        username: '',
        token: '',
        verificat: false,
      }
    },
    sumarVictoria() {
      this.victories++;
      return this.victories;
    },
    setVictories(victories) {
      this.victories = victories;
    },
    setDuelo(duelo) {
      this.duelo = duelo;
    },
    getDuelo() {
      return this.duelo;
    },
    setInfoPartida(nom, maxJugadors) {
      this.nomPartida = nom;
      this.maxJugadors = maxJugadors;
    },
    triggerAnimacioVida() {
      this.animacioVida = true;
      setTimeout(() => {
        this.animacioVida = false;
      }, 500);
    },
    startTimer() {
      if (this.timerStopped) {
        this.timerInterval = setInterval(() => {

          if (this.timer <= 0) {
            socket.emit('bleed');
            this.triggerAnimacioVida();
          } else {
            this.timer--;
          }
        }, 1000);
        this.timerStopped = false;
      }
    },

    setAvatar(avatar) {
      this.avatar = avatar;
    },
    getAvatar() {
      return this.avatar;
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.timerStopped = true;
    },
    setPerdedors(perdedors) {
      this.perdedors = perdedors;
    },
    setGuanyador(guanyador) {
      this.guanyador = guanyador;
    },
    getGuanyador() {
      return this.guanyador;
    },
    setPartides(arrayRoom) {
      this.partides = arrayRoom;
    },
    setLoginInfo(loggedIn, username, token, verificat) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
      this.loginInfo.token = token;
      this.loginInfo.verificat = verificat;
    },
    pushChat(msg) {
      this.chat.push(msg);
    },
    logout() {
      this.loginInfo.loggedIn = false;
      this.loginInfo.username = '';
    },
    setPlayers(playerArray) {
      this.players = playerArray;
      playerArray.forEach(player => {
        if (player.idSocket == socket.id) {
          this.ownPlayer = player;
        }
      });
    },
    getOwnPlayer() {
      return this.ownPlayer;
    },
    setOwnPlayer(player) {
      this.ownPlayer = player;
    },
    getPlayers() {
      return this.players;
    },
    aumentar() {
      this.questionIndex++;
    },
    getQuestionIndex() {
      return this.questionIndex;
    },
    getToken() {
      return this.loginInfo.token;
    },
    setQuestion(question) {
      this.question = question;
      this.timer = question.temps;
      this.questionIndex++;
    },
    setQuestionIndex(index) {
      this.questionIndex = index;

    },
    getQuestionIndex() {
      return this.questionIndex;
    },
    getQuestion() {
      return this.question;
    },
    setNick(nick) {
      this.loginInfo.username = nick;
    },

    setAnswer(newAnswer) {
      this.answer = newAnswer;
    },
    getAnswer() {
      return this.answer;
    },
    isLoggedIn() {
      return this.loginInfo.loggedIn;
    },
    getLoginInfo() {
      return this.loginInfo;
    },
    playerDead() {
      this.dead = true;
      this.animacioMort = true;
      setTimeout(() => {
        this.animacioMort = false;
      }, 10000);
    },
    getTorneigInfo() {
      return this.infoTorneig;
    },
    setTorneigInfo(info) {
      this.infoTorneig = info;
    },
    getTourneigState() {
      return this.stateTorneig;
    },
    setTourneigState(state) {
      this.stateTorneig = state;
    },
    setGuanyat(guanyat) {
      this.guanyat = guanyat;
    },
    getGuanyat() {
      return this.guanyat;
    },
    setPerdut(perdut) {
      this.perdut = perdut;
    },
    getPerdut() {
      return this.perdut;
    },

  },
})
