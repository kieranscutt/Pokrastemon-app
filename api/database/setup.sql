DROP TABLE IF EXISTS users, pokemon, users_pokemon;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    profile_image_url VARCHAR,
    keys INT,
    -- pomodoro settings
    block_num INT,
    block_mins INT,
    short_break_mins INT,
    long_break_mins INT
);

CREATE TABLE pokemon (
    pokemon_id SERIAL PRIMARY KEY,
    pokemon_name VARCHAR,
    front_image_url VARCHAR,
    back_image_url VARCHAR,
    powers VARCHAR,
    egg_image_url VARCHAR,
    keysNeeded INT
);

CREATE TABLE users_pokemon (
    users_pokemon_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    pokemon_id INT REFERENCES pokemon(pokemon_id) NOT NULL
);
