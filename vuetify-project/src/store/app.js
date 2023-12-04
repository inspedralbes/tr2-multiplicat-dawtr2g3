// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
    },
    players: [],
    question: null,
    answer: null,
    questionIndex: -1,
  }),
  actions: {
    setLoginInfo( loggedIn, username, image ) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
    },
    logout(){
      this.loginInfo.loggedIn = false;
      this.loginInfo.username = '';
    },
    setPlayers( playerArray ) {
      this.players = playerArray;
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
    getQuestionIndex(){
      return this.questionIndex;
    },
    getQuestion(){
      return this.question;
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
