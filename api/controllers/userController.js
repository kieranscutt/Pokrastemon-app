require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Token = require('../models/Token')

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
            //console.log(err)
            res.status(500).json({ Error: err.message})
        }
    }

    static async login(req,res) {
        try {
            const data = req.body
            const user = await User.getOneByUsername(data.username)
            const authenticated = await bcrypt.compare(
                data.password,
                user["password"]
            )
            if(!authenticated) {
                throw new Error("Wrong username or password")
            } else {
                const token = await Token.create(user["user_id"])
                res.status(200).json({authenticated: true, token: token.token})
            }
        } catch (err) {
            res.status(403).json({Error: err.message})
        }
    }

    static async getUsers(req,res) {
        try {
            const users = await User.getUsers()
            res.status(200).json(users)
        } catch (err) {
            //console.log(err)
            res.status(404).json({Error: err.message})
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

    static async getPomodoroSettings(req,res) {
        try {
            const user_id = req.tokenObj.user_id
            const settings = await User.getPomodoroSettings(user_id)
            res.status(200).send(settings)
        } catch (err) {
            res.status(500).json({Error: err.message})
        }
    }

    static async updatePomodoroSettings(req,res) {
        try {
            const user_id = req.tokenObj.user_id
            const settings = req.body
            const resp = await User.updatePomodoroSettings(user_id,settings)
            delete resp.password
            res.status(200).send(resp)
        } catch (err) {
            res.status(500).json({Error: err.message})
        }
    }

    static async addKey(req,res) {
        try{
            const user_id = req.tokenObj.user_id
            // let user_id = 1
            const resp = await User.addKey(user_id)
            res.status(200).send(resp)
        } catch (err) {
            //console.log(err)
            res.status(500).json({Error: err.message})
        }
    }

    static async addPokemon(req,res) {
        try {
            const user_id = req.tokenObj.user_id
            const pokemon_id = req.body.pokemon_id
            const resp = await User.addPokemon(user_id,pokemon_id)
            res.status(200).send(resp)
        } catch (err) {
            //console.log(err)
            res.status(500).json({Error: err.message})
        }
    }

    static async getUsersPokemon(req,res) {
        try{
            const user_id = req.tokenObj.user_id
            const resp = await User.getUsersPokemons(user_id)
            res.status(200).send(resp)
        } catch (err) {
            //console.log(err)
            res.status(404).json({Error: err.message})   
        }
    }

    static async removePokemon(req,res) {
        try{
            const user_id = req.tokenObj.user_id
            const pokemon_id = req.body.pokemon_id
            const resp = await User.removePokemon(pokemon_id,user_id)
            res.status(200).send(resp)
        } catch (err) {
            //console.log(err)
            res.status(500).json({Error: err.message})
        }
    }

    static async logout(req, res) {
        try {
          const tokenObj = req.tokenObj;
          const response = await tokenObj.deleteToken();
          res.status(202).json({ message: response });
        } catch (err) {
          res.status(403).json({ Error: err.message });
        }
    }

    static async deleteUser(req,res) {
        try {
            const user_id = req.tokenObj.user_id
            const tokenObj = req.tokenObj;
            const resp = await tokenObj.deleteToken();
            const user = await User.getOneById(user_id)
            const resp2 = await user.deleteUser(user_id)
            res.status(204).json(resp2);
        } catch (err) {
            res.status(403).json({ Error: err.message });
        }
    }
}

module.exports = UserController
