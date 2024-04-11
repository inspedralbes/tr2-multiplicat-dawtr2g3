import { useAppStore } from '@/store/app';

export class CommunicationManager {
    constructor() {
        // this.fetchLink = import.meta.env.VITE_URL_API;
        this.fetchLink = "http://mathroyale.daw.inspedralbes.cat/laravel/public/api/";
        this.loggedIn = false;
        this.store = useAppStore();
    }

    async login(username, password) {
        let formData = new FormData();
        formData.append('nom', username);
        formData.append('password', password);
        let response = await fetch(this.fetchLink + 'login', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: formData
        });
        let jsonResponse = await response.json();
        return jsonResponse;
    }
    async checkToken(token) {
        let formData = new FormData();
        formData.append('token', token);
        let response = await fetch(this.fetchLink + 'checkToken', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: formData
        });
        let jsonResponse = await response.json();
        if (jsonResponse.status == 403 || jsonResponse.status == 401) {
            const store = useAppStore();
           store.logout();
        }
        return jsonResponse;
    }
    async logout(token) {
        let formData = new FormData();
        
        formData.append('token', token);
        let response = await fetch(this.fetchLink + 'logout', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: formData
        });
        let jsonResponse = await response.json();
        console.log(jsonResponse)
        const store = useAppStore();
        store.loginInfo = {
            loggedIn: false,
            username: '',
            token: '',
            verificat: false,
        }
        return jsonResponse;
    }
    async register(username, email, password, password_confirmation) {
        let formData = new FormData();
        formData.append('nom', username);
        formData.append('password', password);
        formData.append('mail', email);
        formData.append('password_confirmation', password_confirmation);
        let response = await fetch(this.fetchLink + 'register', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: formData
        });
        let jsonResponse = await response.json();
        return jsonResponse;
    }
    async crearPregunta(temps, enunciat, tipus, dificultat, categoria, resposta1, resposta2, resposta3, resposta4, token) {
        let respostes = [resposta1, resposta2, resposta3, resposta4];
        respostes = JSON.stringify(respostes);
        let formData = new FormData();
        formData.append('enunciat', enunciat);
        formData.append('tipus', tipus);
        formData.append('temps', temps);
        formData.append('categoria', categoria);
        formData.append('respostes', respostes);
        formData.append('dificultat', dificultat);
        formData.append('token', token);
        let response = await fetch(this.fetchLink + 'crearPregunta', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",

            },
            body: formData
        });
        let jsonResponse = await response.json();
        console.log(jsonResponse)
        return jsonResponse;
    }


    // Other communication methods...

}

export default CommunicationManager;
