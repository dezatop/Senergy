const Router = require('express').Router
const UserController = require('../controllers/userController')
const GroupController = require('../controllers/groupController')


const router = new Router()

router.post('/user', UserController.createUser)
router.put('/user', UserController.updateUser)
router.delete('/user/:id', UserController.delUser)
router.get('/user', UserController.findUser)

router.post('/group', GroupController.createGroup)
router.get('/group', GroupController.findGroup)
router.delete('/group/:id', GroupController.delGroup)
router.put('/group', GroupController.updateGroup)



module.exports = router