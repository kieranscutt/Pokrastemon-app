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
        if(resp.rows.length ==1){
            const pokemon = new Pokemon(resp.rows[0])
            return pokemon
        } else {
            throw new Error("unable to locate pokemon")
        }
    }

    static async addPokemon(pokemon) {
        const { id, name, front_default, back_default, moveNames, typeNames} = pokemon
        const resp = await db.query("INSERT INTO pokemon(pokemon_id,pokemon_name,front_image_url,back_image_url,moves,types) VALUES ($1,$2,$3,$4,$5,$6) RETURNING pokemon_id",[id,name,front_default,back_default,moveNames,typeNames])
        if(resp.rows.length == 1){
            const pokeId = resp.rows[0].pokemon_id
            const newPokemon = await Pokemon.getPokemonByID(pokeId)
            return newPokemon
        } else {
            throw new Error("Failed to add pokemon")
        }
        
    }

    static async getRandomPokemon(){
        const allPokemon = await db.query("SELECT * FROM pokemon")
        if(allPokemon.rows.length>0){
            let pokemon = allPokemon.rows[Math.floor(Math.random()*151)]
            pokemon = await Pokemon.getPokemonByID(pokemon.pokemon_id)
            return pokemon
        } else {
            throw new Error("unable to get a random pokemon")
        }
        
    }
}

module.exports = Pokemon
