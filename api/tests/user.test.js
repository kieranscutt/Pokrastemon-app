describe("Jest Test", () => {
    it('Should work', () => {
        const result = 1 + 1
        expect(result).toBe(2)
    })
})

const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")
const bcrypt = require('bcrypt')

describe("User route", () => {
    let api

    beforeAll(() => {
        api = app.listen(8080, () => {
            console.log("Test server running on port 5000")
        })
    })

    afterAll((done) => {
        console.log("Stopping test server")
        db.end()
        api.close(done)
    })

    let username = ""
    let password = ""
    let profile_image_irl = ""
    let keys = ""
    let user_id = ""
    let block_mins = ""
    let block_num = ""
    let short_break_mins = ""
    let long_break_mins = ""

    //Register
    it("Should create a new user", async () => {
        const newUser = {
            username: "test",
            password: "test"
        }
        const response = await request(app)
            .post("/users/register")
            .send(newUser)
            .expect(201)
        username = response.body.username
        password = response.body.password
        expect(username).toEqual(newUser.username)
        const samePassword = await bcrypt.compare(newUser.password, password)
        expect(samePassword).toEqual(true)
    })

    //LOGIN
    it("should login the user", async () => {
        const user = {
            username: username,
            password: "test"
        }
        const response = await request(app)
            .post("/users/login")
            .send(user)
            .expect(200)
        
        token = response.body.token
        expect(token).toBeTruthy()
    })

    //GET ONE BY ID
    it("should get user by id", async() => {
        const response = await request(app)
            .get(`/users/user`)
            .set({"Authorization": token})
            .expect(200)

        expect(response.body.username).toBe(username)
    })

})


