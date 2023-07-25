

const request = require("supertest")
const app = require("../api.js")
const db = require("../database/connect")
const fs = require('fs');
const sql = fs.readFileSync('/Users/Guy 1/Desktop/liskov/lap3/project/Pokrastemon-app/api/database/setup.sql').toString();
const fetchPokemon = require('../database/fetchPokemon')

describe("Pokemon route", () => {

    afterAll((done) => {
        fetchPokemon()
        .then(data => {
            console.log('Pokemon added')
            db.end(done);
        })
    },30000)

    //Get all pokemon
    it("should get all pokemon", async () => {
        const response = await request(app)
            .get(`/pokemon`)
            .expect(200)
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[0].pokemon_name).toBe('bulbasaur')   
    })

    //Get one by id
    it("should get a pokemon by id", async () => {
        const id = 3
        const venusaur = {
            pokemon_id: 3,
            pokemon_name: 'venusaur',
            front_image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif',
            back_image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/3.gif',
            moves: [
              'swords-dance',     'cut',            'bind',
              'vine-whip',        'headbutt',       'tackle',
              'body-slam',        'take-down',      'double-edge',
              'growl',            'roar',           'hyper-beam',
              'strength',         'mega-drain',     'leech-seed',
              'growth',           'razor-leaf',     'solar-beam',
              'poison-powder',    'sleep-powder',   'petal-dance',
              'string-shot',      'earthquake',     'toxic',
              'rage',             'mimic',          'double-team',
              'defense-curl',     'light-screen',   'reflect',
              'bide',             'amnesia',        'flash',
              'rest',             'substitute',     'snore',
              'curse',            'protect',        'sludge-bomb',
              'mud-slap',         'outrage',        'giga-drain',
              'endure',           'charm',          'false-swipe',
              'swagger',          'fury-cutter',    'attract',
              'sleep-talk',       'return',         'frustration',
              'safeguard',        'sweet-scent',    'synthesis',
              'hidden-power',     'sunny-day',      'rock-smash',
              'facade',           'nature-power',   'helping-hand',
              'knock-off',        'secret-power',   'weather-ball',
              'bullet-seed',      'block',          'frenzy-plant',
              'magical-leaf',     'natural-gift',   'worry-seed',
              'seed-bomb',        'energy-ball',    'earth-power',
              'giga-impact',      'rock-climb',     'leaf-storm',
              'power-whip',       'captivate',      'grass-knot',
              'venoshock',        'round',          'echoed-voice',
              'grass-pledge',     'bulldoze',       'work-up',
              'petal-blizzard',   'grassy-terrain', 'confide',
              'stomping-tantrum', 'grassy-glide',   'terrain-pulse'
            ],
            egg_image_url: null
          }
        const response = await request(app)
            .get(`/pokemon/${id}`)
            .expect(200)
        expect(response.body).toMatchObject(venusaur)
    })

    //Get one by id but bad id
    it("should return not found", async () => {
        const id = 300
        const response = await request(app)
            .get(`/pokemon/${id}`)
            .expect(404)
        expect(response.body.Error).toBe('unable to locate pokemon')
    })

    //Get random pokemon
    it("should get a random pokemon", async () => {
        const response = await request(app)
            .get(`/pokemon/random`)
            .expect(200)
        const id = response.body.pokemon_id
        const checkPokemon = await request(app)
            .get(`/pokemon/${id}`)
        expect(response.body).toMatchObject(checkPokemon.body) 
    })
    
    describe("database with no pokemon", () => {
        
        //Test database if no pokemon
        it("should return an error", async() => {
        await new Promise((r) => setTimeout(r, 4000));
        await db.query(sql)
        const response = await request(app)
            .get(`/pokemon`)
            .expect(404)
        expect(response.body.Error).toBe('There are no pokemon')
        },30000)
    })
    
})