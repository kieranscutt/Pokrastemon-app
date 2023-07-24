require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/User')
// const Token = require('../models/Token')

class UserController {
    static async register(req,res) {
        try {
            const data = req.body
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)

            const salt = await bcrypt.genSalt(rounds)
            data["password"] = await bcrypt.hash(data["password"], salt)

            const result = await User.createUser(data)
            res.status(201).send(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({ Error: err.message})
        }
    }

    static async getUsers(req,res) {
        try {
            const users = await User.getUsers()
            res.status(200).json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json({Error: err.message})
        }
    }

    static async getUserById(req,res) {
        try {
            const user_id = req.tokenObj.user_id
            // let user_id = 1
            const user = await User.getOneById(user_id)
            delete user.password
            res.status(200).send(user)
        } catch (err) {
            res.status(404).json({Error: err.message})
        }
    }

    static async addKey(req,res) {
        try{
            const user_id = req.tokenObj.user_id
            // let user_id = 1
            const resp = await User.addKey(user_id)
            res.status(200).send(resp)
        } catch (err) {
            console.log(err)
            res.status(500).json({Error: err.message})
        }
    }
}

module.exports = UserController
