import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { socket } from '../socket';
export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
    },
    partides: [],
    chat: [],
    players: [],
    ownPlayer:[],
    question: null,
    answer: null,
    questionIndex: -1,
  }),
  actions: {
    setPartides( arrayRoom ) {
      this.partides = arrayRoom;
    },
    setLoginInfo( loggedIn, username, image ) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
    },
    pushChat( msg ) {  
      this.chat.push(msg);
    },
    logout(){
      this.loginInfo.loggedIn = false;
      this.loginInfo.username = '';
    },
    setPlayers( playerArray ) {
      this.players = playerArray;
      playerArray.forEach(player => {
        if(player.idSocket == socket.id){
          this.ownPlayer = player;
        }
      });
    },
    aumentar(){
      this.questionIndex++;
    },
    getQuestionIndex(){
      return this.questionIndex;
    },
    setQuestion( question ) {
      this.question = question;
      this.questionIndex++;
    },
    setQuestionIndex( index ) {
      this.questionIndex = index;

    },
    getQuestionIndex(){
      return this.questionIndex;
    },
    getQuestion(){
      return this.question;
    },
    setNick( nick ) {
      this.loginInfo.username = nick;
    },
    getPlayers(){
      return this.players;
    },
    setAnswer( neWanswer ) {
      this.answer = neWanswer;
    },
    getAnswer(){
      return this.answer;
    },
    isLoggedIn(){
      return this.loginInfo.loggedIn;
    },
    getLoginInfo(){
      return this.loginInfo;
    }
  },
})
