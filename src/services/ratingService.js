import ApiHandler from "./apiHandler";
import axios from 'axios'

class RatingService extends ApiHandler {
    async updateRating(ratingId, stars) {
        return this.handleResponse(async () => axios({
            method: 'PUT',
            url:`${this.apiUrl}/ratings/${ratingId}`,
            data: {
                stars: stars
            },
            withCredentials: true
        }));
    }

    async fetchRatingByBookIsbn(isbn) {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/ratings`,
            params: { book: isbn },
            withCredentials: true
        }));
    }
}

export default new RatingService();
