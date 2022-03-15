const userModel = require('../models/userModal')
const groupModel = require('../models/groupModel')
const ApiError = require('../exeptions/ApiError')

class GroupService {
    async createGroup(data) {
        const group = await groupModel.create({...data})
        const result = this.getNameUsers([group])
        await this.addGroupsInUser(group)
        return  result
    }

    async findGroup() {
        const groups = await groupModel.find()
        const result = this.getNameUsers(groups)
        if(result) {
            return result
        } else throw ApiError.BadRequest("Some error occurred")
    }

    async upGroup(data) {
        const oldGroup = await groupModel.findById(data._id)
        await this.updateGroupsInGroup(oldGroup, data)

        let upGroup = await groupModel.findByIdAndUpdate(data._id, {...data}, {new: true})
        if (upGroup) {
            return upGroup
        } else throw ApiError.BadRequest("Some error occurred")
    }

    async delGroup(id) {
        if (id) {
            const group = await groupModel.findById(id)
            if(group.users.length > 0) {
                throw ApiError.BadRequest("You can't delete a group while there are users in it.")
            } else if(group.users.length === 0) return await groupModel.findByIdAndDelete(id)

        } else {
            throw ApiError.BadRequest("Сan not be empty value")
        }
    }

    async addGroupsInUser (group) {
        for(let value of group?.users) {
            const usersAdd = await userModel.findById(value)
            if(!usersAdd.groups.includes(group._id)) {
                usersAdd.groups.push(group._id)
                usersAdd.save()
            }
        }
    }

    async getNameUsers(groups) {
        const filterResult = []
        for (let value of groups) {
            const result = {}
            result._id = value._id
            result.title = value.title
            result.date = value.date
            result.users = []
            for (let userId of value.users) {
                const getUsersGroup = await userModel.findById(userId)
                if(getUsersGroup?._id) {
                    result.users.push({
                        _id: getUsersGroup?._id,
                        name: getUsersGroup?.name,
                        surname: getUsersGroup?.surname
                    })
                } else {
                    const clearOldUser = await groupModel.findById(value._id)
                    clearOldUser.users = clearOldUser.users.filter(el => el !== userId)
                    await clearOldUser.save()
                }
            }
            filterResult.push(result)
        }
        return filterResult
    }

    async updateGroupsInGroup(arrayOld, currentArray) {

        for (let userId of arrayOld.users) {
            const user = await userModel.findById(userId)
            user.groups = user.groups.filter(user => String(user) !== currentArray._id)
            user.save()
        }

        for (let groupId of currentArray.users) {
            const user = await userModel.findById(groupId)
            user.groups.push(currentArray._id)
            user.save()
        }
    }
}

module.exports = new GroupService()