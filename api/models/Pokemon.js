const db = require('../database/connect')

class Pokemon {
    constructor({pokemon_id, pokemon_name, front_image_url,back_image_url,type,moves,egg_image_url,keysNeeded}){
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
        this.front_image_url = front_image_url;
        this.back_image_url = back_image_url;
        this.type = type;
        this.moves = moves;
        this.egg_image_url = egg_image_url;
        this.keysNeeded = keysNeeded
    }

    static async getRandomPokemon(){
        const allPokemon = await db.query("SELECT * FROM pokemon")
        const pokemon = allPokemon.rows[Math.floor(Math.random()*151)]
        return pokemon
    }

}

module.exports = Pokemon
