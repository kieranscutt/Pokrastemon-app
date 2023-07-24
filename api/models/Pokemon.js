const db = require('../database/connect')

class Pokemon {
    constructor({pokemon_id, pokemon_name, pokedex_number, front_image_url, back_image_url, type, moves, egg_image_url, keys_needed}) {
        this.id = pokemon_id
        this.name = pokemon_name
        this.pokedex = pokedex_number
        this.front_image = front_image_url
        this.back_image = back_image_url
        this.type = type
        this.moves = moves
        this.egg = egg_image_url
        this.keys = keys_needed
    }

    

}

module.exports = Pokemon