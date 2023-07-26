const db = require('../database/connect')

class User {
    constructor({ user_id, username, password, firstName, lastName, profile_image_irl, keys, block_num, block_mins, short_break_mins, long_break_mins }) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.firstName = firstName
        this.lastName = lastName
        this.profile_image_irl = profile_image_irl;
        this.keys = keys;
        this.block_num = block_num
        this.block_mins = block_mins;
        this.long_break_mins = long_break_mins;
        this.short_break_mins = short_break_mins;
    }

    static async getUsers() {
        const resp = await db.query("SELECT user_id, username, profile_image_url, keys, block_num,block_mins,long_break_mins,short_break_mins FROM users")
        if (resp.rows.length == 0) {
            throw new Error('There are no users')
        } else {
            return resp.rows.map((u) => new User(u))
        }
    }

    static async getOneByUsername(username) {
        const resp = await db.query("SELECT * FROM users WHERE username = $1", [username])
        if (resp.rows.length == 0 ) {
            throw new Error ("User with this username does not exist.")
        } else {
            return new User(resp.rows[0])
        }
    }

    static async getOneById(id) {
        const resp = await db.query(
            "SELECT * FROM users WHERE user_id = $1", [id]
        )
        return new User(resp.rows[0])
    }

    static async createUser(data) {
        const { username, password, firstName, lastName } = data
        const resp = await db.query(
            `INSERT INTO users (username,password,firstName,lastName)
            VALUES ($1, $2,$3,$4) RETURNING user_id`,[username,password,firstName,lastName]
        )
        const id = resp.rows[0].user_id
        const newUser = await User.getOneById(id)
        return newUser
    }

    static async getPomodoroSettings(id) {
        const resp = await db.query(`
            SELECT block_num, block_mins, long_break_mins, short_break_mins
            FROM users WHERE user_id = $1`, [id])
        return resp.rows[0]
    }

    static async updatePomodoroSettings(id,settings) {
        const { block_mins, block_num, short_break_mins, long_break_mins } = settings
        const resp = await db.query('UPDATE users SET block_mins = $1, block_num=$2,short_break_mins=$3,long_break_mins=$4 WHERE user_id = $5', 
        [block_mins,block_num,short_break_mins,long_break_mins,id])
        const updatedUser = await User.getOneById(id)
        return updatedUser
    }

    static async getUsersPokemons(id){
        const resp = await db.query(
            "SELECT pokemon_name FROM pokemon p LEFT JOIN users_pokemon u ON p.pokemon_id = u.pokemon_id WHERE u.user_id = $1",[id]
        )
        if (resp.rows.length > 0){
            return resp.rows.map((p) => p.pokemon_name)
        } else {
            throw new Error('User does not have any pokemon')
        }
    }

    static async addKey(id) {
        let currentKeys = await db.query("SELECT keys FROM users WHERE user_id = $1", [id])
        currentKeys = currentKeys.rows[0].keys
        let newKeys = currentKeys<3 ? currentKeys+1 : 0
        // let newKeys = currentKeys+1
        await db.query("UPDATE users SET keys = $1 WHERE user_id = $2", [newKeys,id])
    
        const updatedUser = await User.getOneById(id)
        return updatedUser
    }

    static async addPokemon(user_id,pokemon_id) {
        const resp = await db.query("INSERT INTO users_pokemon(pokemon_id, user_id) VALUES ($1,$2) RETURNING *",
            [pokemon_id, user_id])
        return resp.rows[0]
    }

    static async removePokemon(pokemon_id,user_id) {
        const resp = await db.query("DELETE FROM users_pokemon WHERE pokemon_id=$1 AND user_id=$2",[pokemon_id,user_id])
        return 'Pokemon removed from user'
    }

    async deleteUser() {
        const resp = await db.query("DELETE FROM users_pokemon WHERE user_id = $1",[this.user_id])
        const resp2 = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *",[this.user_id])
        return new User(resp2.rows[0])
    }
}

module.exports = User
