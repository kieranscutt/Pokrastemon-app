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

    static async getAllPokemon(){
        const resp = await db.query("SELECT * FROM pokemon")
        if (resp.rows.length > 0){
            return resp.rows.map((p) => new Pokemon(p))
        } else {
            throw new Error ('There are no pokemon')
        }
    }

    static async getPokemonByID(id){
        const resp = await db.query("SELECT * FROM pokemon WHERE pokemon_id = $1",[id])
        const pokemon = new Pokemon(resp.rows[0])
        return pokemon
    }

    static async getRandomPokemon(){
        const allPokemon = await db.query("SELECT * FROM pokemon")
        let pokemon = allPokemon.rows[Math.floor(Math.random()*151)]
        pokemon = await Pokemon.getPokemonByID(pokemon.pokemon_id)
        return pokemon
    }

}

module.exports = Pokemon
