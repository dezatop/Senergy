import api from './index'

class GroupService {
    async getGroup() {
        return await api(`/group`).then(response => { return response })
            .catch(e => { return {status:400}})
    }

    async createGroup(data) {
        return await api.post(`/group`, data).then(response => { return response })
            .catch(e => { return {status:400}})
    }

    async putGroup(data) {
        return await api.put(`/group`, data).then(response => { return response })
            .catch(e => { return {status:400}})
    }

    async delGroup(data) {
        return await api.delete(`/group/${data}`).then(response => { return response })
            .catch(e => { return {status:400}})
    }

}

export default new GroupService()