import axios from 'axios'

const API_URL = 'http://localhost:3000';

class LibrarySDK {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    
    async fetchBooks() {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/books`,
            withCredentials: true
        }));
    }

    async fetchBooksByGenre(genre, pageNumber, limit, cancel) {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${API_URL}/books/genre/${genre}`,
            params: { page: pageNumber, limit: limit },
            withCredentials: true,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }))
    }

    async fetchBooksByTitle(title) {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${API_URL}/books`,
            params: { title: title },
        }))
    }

    async fetchBook(isbn) {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/books/${isbn}`,
            withCredentials: true
        }));
    }

    async editBook(isbn, description,title, availableCopies, genre, imageSource) {
        return this.handleResponse(async () => axios({
            method: 'PUT',
            url:`${this.apiUrl}/books/${isbn}`,
            data: {
                description: description,
                title: title,
                availableCopies: availableCopies,
                imageSource: imageSource,
                genre: genre
            },
            withCredentials: true
        }));
    }

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
    async createBook(book) {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/books`,
            data: {
                description: book.description,
                title: book.title,
                availableCopies: book.availableCopies,
                imageSource: book.imageSource,
                genre: book.genre
            },
            withCredentials: true
        }));
    }

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

    async handleBookAction(action, isbn) {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/users/books?action=${action}`,
            data: {
                isbn: isbn
            },
            withCredentials: true
        }));
    }

    async getComments(content) {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/comments`,
            data: {
                content: content
            }
        }));
    }

    async addComment(content, parentId = null, referenceBookIsbn) {
        return this.handleResponse(async () => axios({
            method: 'POST',
            url:`${this.apiUrl}/comments`,
            data: {
                content: content,
                parentId: parentId,
                referenceBookIsbn: referenceBookIsbn
            },
            withCredentials: true
        }));
    }

    async editComment(commentId, content) {
        return this.handleResponse(async () => axios({
            method: 'PUT',
            url:`${this.apiUrl}/comments/${commentId}`,
            data: {
                content: content
            },
            withCredentials: true
        }));
    }

    async deleteComment(commentId) {
        return this.handleResponse(async () => axios({
            method: 'DELETE',
            url:`${this.apiUrl}/comments/${commentId}`,
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


    async handleResponse(asyncReqFunc) {
        try {
            const res = await asyncReqFunc();
            const content = res.data;
            if(res.status >= 400 ) {
                console.log('Unexpected status code ' + res.status);
                return Promise.reject('Unexpected status code ' + res.status);
            }

            return content;
        } catch(err) {
            return Promise.reject(err);
        }
    }
}

export default new LibrarySDK(API_URL);
