const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const pokemonController = require('../controllers/pokemonController')

const pokemonRouter = Router()

pokemonRouter.get('/random', pokemonController.getRandomPokemon)

module.exports = pokemonRouter
