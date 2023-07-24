describe("Jest Test", () => {
    it('Should work', () => {
        const result = 1 + 1
        expect(result).toBe(2)
    })
})

const request = require("supertest")
const api = require("../api.js")
const db = require("../database/connect")

describe("User route", () => {
    let api

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log("Test server running on port 5000")
        })
    })

    afterAll((done) => {
        console.log("Stopping test server")
        db.end()
        api.close(done)
    })

    
})


