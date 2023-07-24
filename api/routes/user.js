const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", userController.getUsers)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.get("/user", userController.getUserById)
userRouter.patch("/keys", userController.addKey)
userRouter.delete("/logout", userController.logout)

module.exports = userRouter
