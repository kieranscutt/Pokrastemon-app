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
        const id = resp.rows[0]
        const newUser = await User.getOneById(id)
        return newUser
    }
}

module.exports = User
