DROP TABLE tokens;

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token CHAR(36) NOT NULL,
    user_id INT NOT NULL
);

INSERT INTO tokens (token, user_id) VALUES ('testicularToken', 7);