const API_URL = 'http://localhost:3000';

class ApiHandler {
    constructor() {
        this.apiUrl = API_URL;
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

export default ApiHandler;
