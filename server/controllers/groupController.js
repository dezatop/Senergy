const groupService = require('../service/groupService')
const ApiError = require('../exeptions/ApiError')

class GroupController {
    async createGroup(req, res, next) {
        try {
            const data = req.body
            if(data.title) {
                const group = await groupService.createGroup(data)
                return res.json(group)
            } else throw ApiError.BadRequest('Invalid value')

        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

    async updateGroup(req, res, next) {
        try{
            const data = req.body
            const id = data._id

            if(id) {
                const updatingGroup = await groupService.upGroup(data)
                return res.json(updatingGroup)
            } else next()

        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

    async delGroup(req, res) {
        try{
            const id = req.params.id
            await groupService.delGroup(id)

            return res.json({msg:"Group has been delete"})
        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

    async findGroup(req, res) {
        try{
            const groups = await groupService.findGroup()

            return res.json(groups)
        } catch (e) {
            return res.status(500).json({msg:e.message})
        }
    }

}

module.exports = new GroupController()