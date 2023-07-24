const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const pokemonController = require('../controllers/pokemonController')

const pokemonRouter = Router()

pokemonRouter.get('/', pokemonController.getAllPokemon)
pokemonRouter.get('/random', pokemonController.getRandomPokemon)
pokemonRouter.get('/:id',pokemonController.getPokemonByID)

module.exports = pokemonRouter
