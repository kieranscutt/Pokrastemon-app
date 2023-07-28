const fs = require('fs');
require("dotenv").config();

const db = require("./connect");
const fetchPokemon = require('./fetchPokemon')

const sql = fs.readFileSync('./database/setup.sql').toString();

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
