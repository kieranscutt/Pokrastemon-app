const db = require('./connect')

const fetchPokemon = async() => {
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
            await db.query("INSERT INTO pokemon(pokemon_id,pokemon_name,front_image_url,back_image_url,moves,types) VALUES ($1,$2,$3,$4,$5,$6)",[id,name,front_default,back_default,moveNames,typeNames])
        } catch (err) {
            console.log(err)
            return err
        }
    }
}


module.exports = fetchPokemon
