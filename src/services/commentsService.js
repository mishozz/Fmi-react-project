import ApiHandler from "./apiHandler";
import axios from 'axios'

class CommentService extends ApiHandler {
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
}

export default new CommentService();
