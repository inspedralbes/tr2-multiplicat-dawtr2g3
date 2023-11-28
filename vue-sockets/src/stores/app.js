import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
      image: '',
    },
    infoVotos:{
      votos:[]
    }
  }),
  actions: {
    setLoginInfo( loggedIn, username, image ) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
      this.loginInfo.image = image;
    },
    setVotos(votos){
      this.infoVotos.votos=votos;
    },
    getVotos(){
      return this.infoVotos.votos;
    },
    isLoggedIn(){
      return this.loginInfo.loggedIn;
    },
    getLoginInfo(){
      return this.loginInfo;
    }
  },
})
