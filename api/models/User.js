const db = require('../database/connect')

class User {
    constructor({ user_id, username, password, profile_image_irl, keys, block_num, block_mins, short_break_mins, long_break_mins }) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.profile_image_irl = profile_image_irl;
        this.keys = keys;
        this.block_num = block_num
        this.block_mins = block_mins;
        this.long_break_mins = long_break_mins;
        this.short_break_mins = short_break_mins;
    }

    static async getUsers() {
        const resp = await db.query("SELECT user_id, username, profile_image_url, keys, block_num,block_mins,long_break_mins,short_break_mins FROM users")
        if (resp.rows.length > 0) {
            return resp.rows.map((u) => new User(u))
        } else {
            return new Error('There are no users')
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
        const { username, password } = data
        const resp = await db.query(
            `INSERT INTO users (username,password)
            VALUES ($1, $2) RETURNING user_id`,[username,password]
        )
        const id = resp.rows[0].user_id
        const newUser = await User.getOneById(id)
        return newUser
    }

    static async addKey(id) {
        let currentKeys = await db.query("SELECT keys FROM users WHERE user_id = $1", [id])
        currentKeys = currentKeys.rows[0].keys
        // let newKeys = currentKeys<4 ? currentKeys+1 : 0
        let newKeys = currentKeys+1
        await db.query("UPDATE users SET keys = $1 WHERE user_id = $2", [newKeys,id])
    
        const updatedUser = await User.getOneById(id)
        return updatedUser
    }
}

module.exports = User
