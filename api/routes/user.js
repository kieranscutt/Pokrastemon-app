const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/userController')

const userRouter = Router()

userRouter.post("/register", userController.register)
userRouter.get("/user", userController.getUserById)
userRouter.get("/", userController.getUsers)

module.exports = userRouter
