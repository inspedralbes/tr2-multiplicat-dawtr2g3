import { useAppStore } from '@/store/app';
export class CommunicationManager {
    constructor() {
        //En local el fetch es fa a http://localhost:8000/api/
        //En producció cambiem a http://mathroyale.daw.inspedralbes.cat/laravel/public/api/
        //En preproducció cambiem a http://pretr2g3.daw.inspedralbes.cat/laravel/public/api/
        this.fetchLink = 'http://mathroyale.daw.inspedralbes.cat/laravel/public/api/';
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
    async crearPregunta(temps, enunciat, tipus, dificultat, categoria, resposta1, resposta2, resposta3, resposta4) {
        let respostes = [resposta1, resposta2, resposta3, resposta4];
        respostes = JSON.stringify(respostes);
        let formData = new FormData();
        formData.append('enunciat', enunciat);
        formData.append('tipus', tipus);
        formData.append('temps', temps);
        formData.append('categoria', categoria);
        formData.append('respostes', respostes);
        formData.append('dificultat', dificultat);
        let response = await fetch(this.fetchLink + 'crearPregunta', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: formData
        });
        let jsonResponse = await response.json();
        return jsonResponse;
    }
    logout() {
    }

    // Other communication methods...

}

export default CommunicationManager;
