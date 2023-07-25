const Pokemon = require('../models/Pokemon')

class PokemonController{

    static async getAllPokemon(req,res) {
        try {
            const pokemon = await Pokemon.getAllPokemon()
            res.status(200).send(pokemon)
        } catch (err) {
            //console.log(err)
            res.status(500).json({Error: err.message})
        }
    }

    static async getRandomPokemon(req,res) {
        try{
            const pokemon = await Pokemon.getRandomPokemon()
            res.status(200).send(pokemon)
        } catch (err) {
            console.log(err)
            res.status(500).json({Error: err.message})
        }
    }

    static async getPokemonByID(req,res) {
        try{
            const { id } = req.params
            const pokemon = await Pokemon.getPokemonByID(id)
            res.status(200).send(pokemon)
        } catch (err) {
            //console.log(err)
            res.status(404).json({Error: err.message})
        }
    }
}

module.exports = PokemonController
