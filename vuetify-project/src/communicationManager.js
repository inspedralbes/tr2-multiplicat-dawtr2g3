import { useAppStore } from '@/store/app';
export class CommunicationManager {
    constructor() {
        this.fetchLink = 'http://localhost:8000/api/';
        this.loggedIn = false;
        this.store = useAppStore();
    }

    async login(username, password) {
        let formData = new FormData();
        console.log(username, password)
        formData.append('nom', username);
        formData.append('password', password);
        console.log(this.fetchLink + 'login');
        let response = await fetch(this.fetchLink + 'login', {
            method: 'POST',
            headers: {
                    "Access-Control-Allow-Origin": "*",
            },
            body: formData
        });
        console.log(response)
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        
        return jsonResponse;
    }

    logout() {
    }

    // Other communication methods...

}

export default CommunicationManager;
