const UserModel = require('../models/userModal')
const GroupModel = require('../models/groupModel')
const ApiError = require('../exeptions/ApiError')

class UserService {
    async createUser(data) {
        const user = await UserModel.create({...data})
        const result = this.searchTitleGroup([user])
        await this.addUsersInGroup(user)

        if (result) {
            return result
        } else throw ApiError.BadRequest('Some error occurred')
    }

    async upUser(data) {
        if (data._id) {
            const oldUser = await UserModel.findById(data._id)

            await this.updateGroupsInUser(oldUser, data)

            let upUser = await UserModel.findByIdAndUpdate(data._id, {...data}, {new: true})

            if (upUser) {
                return upUser
            } else throw ApiError.BadRequest('Some error occurred')
        }
    }

    async delUser(id) {
        if (id) {
            let delUser = await UserModel.findByIdAndDelete(id)
            if (delUser) {
                return {msg: 'User has been deleted'}
            } else throw ApiError.BadRequest('Some error occurred')
        } else throw ApiError.BadRequest('Invalid value')
    }

    async getUser() {
        let users = await UserModel.find()
        const result = this.searchTitleGroup(users)

        if (result) {
            return result
        } else throw ApiError.BadRequest('Some error occurred')

    }

    async searchTitleGroup(array) {
        const filterResult = []

        for (let value of array) {
            const result = {}
            result._id = value._id
            result.name = value.name
            result.surname = value.surname
            result.date = value.date
            result.groups = []
            for (let groupsId of value.groups) {
                const getUsersGroup = await GroupModel.findById(groupsId)
                if (getUsersGroup?._id) {
                    result.groups.push({
                        _id: getUsersGroup?._id,
                        title: getUsersGroup?.title,
                    })
                } else {
                    const clearOldUser = await UserModel.findById(value._id)
                    clearOldUser.groups = clearOldUser.groups.filter(el => el !== groupsId)
                    await clearOldUser.save()
                }
            }
            filterResult.push(result)
        }
        return filterResult
    }

    async addUsersInGroup(user) {
        for (let value of user?.groups) {
            const usersAdd = await GroupModel.findById(value)
            if (!usersAdd.users.includes(user._id)) {
                usersAdd.users.push(user._id)
                usersAdd.save()
            }
        }
    }

    async updateGroupsInUser(arrayOld, currentArray) {
        for (let groupId of arrayOld.groups) {
            const group = await GroupModel.findById(groupId)

            group.users = group.users.filter(user => String(user) !== currentArray._id)
            group.save()
        }

        for (let groupId of currentArray.groups) {
            const group = await GroupModel.findById(groupId)
            group.users.push(currentArray._id)
            group.save()
        }
    }
}

module.exports = new UserService()