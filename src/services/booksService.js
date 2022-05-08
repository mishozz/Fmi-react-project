import ApiHandler from "./apiHandler";
import axios from 'axios'

class LibraryService extends ApiHandler {
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
            url:`${this.apiUrl}/books/genre/${genre}`,
            params: { page: pageNumber, limit: limit },
            withCredentials: true,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }))
    }

    async fetchBooksByTitle(title) {
        return this.handleResponse(async () => axios({
            method: 'GET',
            url:`${this.apiUrl}/books`,
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
}

export default new LibraryService();
