

const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")

describe("Pokemon route", () => {
    let api

    beforeAll(() => {
        api = app.listen(8080, () => {
            console.log("Test server running on port 8080")
        })
    })

    afterAll((done) => {
        console.log("Stopping test server")
        db.end()
        api.close(done)
    })

    //Get all pokemon
    it("should get all pokemon", async () => {
        const response = await request(app)
            .get(`/pokemon`)
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[0].pokemon_name).toBe('bulbasaur')   
    })

    //Get random pokemon

})