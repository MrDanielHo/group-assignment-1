DROP TABLE IF EXISTS users, questions, games;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    score Int DEFAULT = 0,
    PRIMARY KEY (id)
);

CREATE TABLE questions (
    id INT GENERATED ALWAYS AS IDENTITY,
    question VARCHAR(250) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    answer VARCHAR(250) NOT NULL,
    wrong_answer_1 VARCHAR(250) NOT NULL,
    wrong_answer_2 VARCHAR(250) NOT NULL,
    wrong_answer_3 VARCHAR(250) NOT NULL,
    points INT NOT NULL,
    image_url VARCHAR(300),
    PRIMARY KEY (id)
);

CREATE TABLE games (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(250) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    resource_url VARCHAR(300),
    PRIMARY KEY (id)
);