const db = require('./connect')
const Pokemon = require('../models/Pokemon')

const fetchPokemon = async(req, res) => {
    for (let i = 1; i<152; i++){
        try{
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const pokemon = await resp.json()
            const { name,sprites,moves,types,id } = pokemon
            const { versions } = sprites
            const back_default = versions["generation-v"]["black-white"].animated.back_default
            const front_default = versions["generation-v"]["black-white"].animated.front_default
            const typeNames = types.map((t) => t.type.name)
            const moveNames = moves.map((m) => m.move.name)
            const data = { id, name, front_default, back_default, typeNames, moveNames}
            const response = await Pokemon.addPokemon(data)
        } catch(error) {
            res.status(500).json({Error: error.message})
            break
        }  
    }   
}


module.exports = fetchPokemon
