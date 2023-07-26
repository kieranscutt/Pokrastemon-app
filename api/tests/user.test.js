
const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")
const bcrypt = require('bcrypt')

describe("User route", () => {

    afterAll((done) => {
        console.log("Stopping test server")
        db.end(done)
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

    const newUser = {
        username: "test",
        password: "test",
        firstName: "cheese",
        lastName: "burger"
    }
    let token = ""
    let token2 = ""

    //Get users but no user
    it("should return error", async () => {
        const response = await request(app)
            .get("/users")
            .expect(404)

        expect(response.body.Error).toBe('There are no users')
    })

    //Register
    it("Should create a new user", async () => {
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

    //Register repeat user
    it("Should give an error if user tries to register again with the same details", async () => {
        const response = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(500);
    
        let { Error } = response.body;
    
        expect(Error).toBe(`duplicate key value violates unique constraint \"users_username_key\"`);
      });

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

    //login with wrong password
    it("should say wrong credentials", async () => {
        const user = {
            username: username,
            password: "balls"
        }
        const response = await request(app)
            .post("/users/login")
            .send(user)
            .expect(403)
        expect(response.body.Error).toBe('Wrong username or password')
    })

    //Get all users
    it("should get all users", async () => {
        const newUser2 = {
            username: "test2",
            password: "test2",
            firstName: "dragon",
            lastName: "deez"
        }
        const addAnother = await request(app)
            .post("/users/register")
            .send(newUser2)

        const response = await request(app)
            .get("/users")
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[1].username).toBe(newUser2.username)

        const loginUser2 = await request(app)
            .post("/users/login")
            .send(newUser2)
            .expect(200)
        token2 = loginUser2.body.token
    })

    //Get one by id
    it("should get user by id", async() => {
        const response = await request(app)
            .get(`/users/user`)
            .set({"Authorization": token})
            .expect(200)

        expect(response.body.username).toBe(username)
        user_id = response.body.user_id
    })

    //Get one by username errors
    //Wrong username
    it("should return wrong username error", async () => {
        const wrongUser = {
            username: "beesechurger",
            password: "deez"
        }
        const response = await request(app)
            .post(`/users/login`)
            .send(wrongUser)
            .expect(403)
        
        expect(response.body.Error).toBe("User with this username does not exist.")
    })

    //Quick auth tests
    //null
    it("does not like null", async () => {
        const response = await request(app)
            .get(`/users/user`)
            .set({"Authorization": null})
            .expect(403)
        expect(response.body.error).toBe('User not authenticated.')
    })

    //bad token
    it("does not like bad tokens", async () => {
        const response = await request(app)
            .get(`/users/user`)
            .set({"Authorization": "cheeseburger"})
            .expect(403)
        expect(response.body.error).toBe('Unable to find token.')
    })

    //Keys
    //Add a key
    it("should add a key", async() => {
        const response = await request(app)
            .patch(`/users/keys`)
            .set({"Authorization": token})
            .expect(200)
        
        expect(response.body.keys).toBeGreaterThan(0)
    })

    //Subtract a key?

    //pomodoro
    //get
    it("should get pomodoro settings", async () => {
        const response = await request(app)
            .get('/users/pomodoro')
            .set({"Authorization": token})
            .expect(200)
        expect(response.body.block_mins).toBe(20)
        expect(response.body.block_num).toBe(4)
        expect(response.body.short_break_mins).toBe(5)
        expect(response.body.long_break_mins).toBe(20)
    })

    //update
    it("should update pomodoro settings", async () => {
        const settings = {
            block_mins: 15,
            block_num: 5,
            short_break_mins:4,
            long_break_mins:25
        }
        const response = await request(app)
            .patch(`/users/pomodoro`)
            .set({"Authorization": token})
            .send(settings)
            .expect(200)
            expect(response.body.block_mins).toBe(settings.block_mins)
            expect(response.body.block_num).toBe(settings.block_num)
            expect(response.body.short_break_mins).toBe(settings.short_break_mins)
            expect(response.body.long_break_mins).toBe(settings.long_break_mins)
    })

    //update with stupid settings
    it("should fail to update settings", async () => {
        const settings = {
            cheeseBurger: "beans"
        }
        const response = await request(app)
            .patch(`/users/pomodoro`)
            .set({"Authorization": token})
            .send(settings)
            .expect(500)
        expect(response.body.Error).toBe("Invalid settings")
    })

    //pokemon
    //Add pokemon
    it("should add a pokemon to a user", async () => {
        const id = {
            pokemon_id: 94
        }
        const response = await request(app)
            .patch(`/users/pokemon`)
            .set({"Authorization": token})
            .send(id)
            .expect(200)
        expect(response.body.pokemon_id).toBe(id.pokemon_id)  
    }, 20000)

    //add a pokemon that isn't there
    it("should fail to add a pokemon", async () => {
        const id = {
            pokemon_id: "cheese"
        }
        const response = await request(app)
            .patch(`/users/pokemon`)
            .set({"Authorization": token})
            .send(id)
            .expect(500)
        expect(response.body.Error).toBe('invalid input syntax for type integer: "cheese"')
    })

    //Display all pokemon
    it("should display all user pokemon", async () => {
        const id = {
            pokemon_id: 149
        }
        const addOneMore = await request(app)
            .patch(`/users/pokemon`)
            .set({"Authorization": token})
            .send(id)

        const response = await request(app)
            .get(`/users/pokemon`)
            .set({"Authorization": token})
            .expect(200)

        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[0]).toBe('gengar')
    })

    //Display all pokemon but no pokemon
    it("should return an error for no pokemon", async () => {
        const response = await request(app)
            .get(`/users/pokemon`)
            .set({"Authorization": token2})
            .expect(404)
        expect(response.body.Error).toBe('User does not have any pokemon')
    })

    //Delete a pokemon
    it("should delete a pokemon by id", async () => {
        const id = {
            pokemon_id:94
        }
        const response = await request(app)
            .delete(`/users/pokemon`)
            .set({"Authorization": token})
            .send(id)
            .expect(200)
        const checkDel = await request(app)
            .get(`/users/pokemon`)
            .set({"Authorization": token})

        expect(checkDel.body[0]).toBe('dragonite')
    })

    //Delete a pokemon that doesn't exist
    it("should return an error", async () => {
        const id = {
            pokemon_id: "burger"
        }
        const response = await request(app)
            .delete(`/users/pokemon`)
            .set({"Authorization": token})
            .send(id)
            .expect(500)
        expect(response.body.Error).toBe('invalid input syntax for type integer: "burger"')
    })

    //Logout
    it("should logout the user", async () => {
        const response = await request(app)
            .delete(`/users/logout`)
            .set({"Authorization": token})
            .expect(202)
        expect(response.body.message).toBe('Token deleted.')
    })

    //Delete user
    it("should delete the user", async () => {
        const user1 = {
            username: username,
            password: "test"
        }
        const user2 = {
            username: "test2",
            password: "test2"
        }

        const loginUser1 = await request(app)
            .post("/users/login")
            .send(user1)
            .expect(200)
        token = loginUser1.body.token
        const response = await request(app)
            .delete(`/users/delete`)
            .set({"Authorization": token})
            .expect(204)

        const checkDelUser = await request(app)
            .get("/users")
            .expect(200)
        expect(checkDelUser.body.length).toBe(1)
        expect(checkDelUser.body[0].username).toBe(user2.username)

        const response2 = await request(app)
            .delete(`/users/delete`)
            .set({"Authorization": token2})
            .expect(204)   
    })

    //Test delete error
    // it("should return an error", async () => {
    //     const response = await request(app)
    //         .delete(`/users/delete`)
    //         .set({"Authorization": "testicularToken"})
    //         .expect(403)
    //     console.log(response.body)
    // })
})




