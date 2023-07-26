const fs = require('fs');
require("dotenv").config();

const db = require("../../database/connect");
const fetchPokemon = require('../../database/fetchPokemon')

const sql = fs.readFileSync('/Users/Guy 1/Desktop/liskov/lap3/project/Pokrastemon-app/api/tests/mockDatabase/setupMock.sql').toString();

db.query(sql)
    .then(data => {
        fetchPokemon()
        .then(data => {
            console.log('Pokemon added')
            db.end();
            console.log("Set-up complete.");
        })
        .catch(err => console.log(err))
    })
    .catch(error => console.log(error));