import api from './index'

class UserService {
    async getUser() {
        return await api(`/user`).then(response => { return response })
            .catch(e => { return {status:400}})
    }

    async createUser(data) {
        return await api.post(`/user`, data).then(response => { return response })
            .catch(e => { return {status:400}})
    }

    async upUser(data) {
        return await api.put(`/user`, data).then(response => { return response })
            .catch(e => { return {status:400}})
    }

    async delUser(data) {
        return await api.delete(`/user/${data}`).then(response => { return response })
            .catch(e => { return {status:400}})
    }
}

export default new UserService()