const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const pokemonController = require('../controllers/pokemonController')
const fetchPokemon = require('../database/fetchPokemon')

const pokemonRouter = Router()

pokemonRouter.get('/', pokemonController.getAllPokemon)
pokemonRouter.get('/random', pokemonController.getRandomPokemon)
pokemonRouter.get('/:id',pokemonController.getPokemonByID)
pokemonRouter.post('/add', pokemonController.addPokemon)
pokemonRouter.post('/fetch', fetchPokemon)

module.exports = pokemonRouter
