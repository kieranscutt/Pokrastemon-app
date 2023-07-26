DROP TABLE IF EXISTS users, pokemon, users_pokemon, tokens;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    profile_image_url VARCHAR,
    keys INT DEFAULT 0,
    -- pomodoro settings
    block_num INT DEFAULT 4,
    block_mins INT DEFAULT 20,
    short_break_mins INT DEFAULT 5,
    long_break_mins INT DEFAULT 20
);

CREATE TABLE pokemon (
    pokemon_id INT NOT NULL PRIMARY KEY,
    pokemon_name VARCHAR,
    front_image_url VARCHAR,
    back_image_url VARCHAR,
    types VARCHAR ARRAY,
    moves VARCHAR ARRAY,
    egg_image_url VARCHAR,
    keysNeeded INT
);

CREATE TABLE users_pokemon (
    users_pokemon_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    pokemon_id INT REFERENCES pokemon(pokemon_id) NOT NULL
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token CHAR(36) NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id)
);