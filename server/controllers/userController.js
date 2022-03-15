const userService = require('../service/userService')
const ApiError = require('../exeptions/ApiError')


class UserController {

    async createUser(req, res) {
        try {
            const {name, surname} = req.body
            const data = req.body
            if(name && surname) {
                const user = await userService.createUser(data)
                return res.json(user)
            } else throw ApiError.BadRequest('Invalid value')

        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

    async updateUser(req, res) {
        try{
            const body = req.body
            const updatingUser = await userService.upUser(body)

            return res.json(updatingUser)
        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

    async delUser(req, res) {
        try{
            const id = req.params.id
            const updatingUser = await userService.delUser(id)

            return res.json(updatingUser)
        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

    async findUser(req, res) {
        try{
            const users = await userService.getUser()

            return res.json(users)
        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

}

module.exports = new UserController()