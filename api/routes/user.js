const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", userController.getUsers)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)

userRouter.use(authenticator)

userRouter.get("/user", userController.getUserById)
userRouter.patch("/add-key", userController.addKey)
userRouter.patch("/subtract-key", userController.subtractKeys)

userRouter.get("/pomodoro", userController.getPomodoroSettings)
userRouter.patch('/pomodoro',userController.updatePomodoroSettings)

userRouter.get('/pokemon', userController.getUsersPokemon)
userRouter.patch("/pokemon", userController.addPokemon )
userRouter.delete('/pokemon', userController.removePokemon)

userRouter.delete('/delete',userController.deleteUser)
userRouter.delete("/logout", userController.logout)

module.exports = userRouter
