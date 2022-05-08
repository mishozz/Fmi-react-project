import ApiHandler from "./apiHandler";
import axios from 'axios'

class UserService extends ApiHandler {
    async login(email, password) {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/users/login`,
            data: {
                email: email,
                password: password
            },
            withCredentials: true
        }));
    }

    async register(email, password) {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/users/register`,
            data: {
                email: email,
                password: password
            },
        }));
    }

    async logout() {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/users/logout`,
            withCredentials: true
        }));
    }

    async refreshToken() {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/users/token`,
            withCredentials: true
        }));
    }

    async fetchUserBooks() {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/users/takenbooks`,
            withCredentials: true
        }));
    }

    async getUser(email) {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/users/${email}`,
            withCredentials: true
        }));
    }
}

export default new UserService();
