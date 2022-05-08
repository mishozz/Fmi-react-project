import ApiHandler from "./apiHandler";
import axios from 'axios'

class GenreService extends ApiHandler {
    async fetchGenres() {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/genres`,

        }));
    }

    async createGenre(genre) {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/genres`,
            data: {
                name: genre.name,
            },
            withCredentials: true
        }));
    }
}

export default new GenreService();
