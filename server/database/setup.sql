DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS games;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
    score INT DEFAULT 0,
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
    image_url VARCHAR(300),
    PRIMARY KEY (id),
    CONSTRAINT fk_game
        FOREIGN KEY(game_id)
        REFERENCES games(game_id)
);

CREATE TABLE games (
    game_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(250) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    resource_url VARCHAR(300),
    PRIMARY KEY (game_id)
);

INSERT INTO users (name, email, password, isAdmin, score) 
 VALUES 
('Charlie Rivers', 'charlie@example.com', 'geoPass123', FALSE, 0),
('Dana Hill', 'dana@example.com', 'exploreWorld456', FALSE, 0),
('Main Admin', 'admin@example.com', 'securePassword321', TRUE, 0)
('Administrator', 'the_admin@lafosse.com', 'admin', TRUE, 0)
('Derek Dyson', 'd.dyson@lafosse.com', 'test123!', FALSE, 10),
('Stephen Miller', 'miller@lafosse.com', 'test456!', FALSE, 0),
('Karen Smith', 'smitherson@lafosse.com', '123test321!', FALSE, 20),
('Georgie Pang', 'd.dyson@lafosse.com', 'test123!', FALSE, 50),
('Alexa Lemon', 'd.dyson@lafosse.com', 'test123!', FALSE, 200);

INSERT INTO questions (id,
    question,
    subject,
    answer,
    wrong_answer_1,
    wrong_answer_2,
    wrong_answer_3,
    image_url,
    game_id
) VALUES
(1, 'What is the capital of France?', 'Geography', 'Paris', 'Lyon', 'Marseille', 'Nice', '', 1),
(2, 'What is the capital city of Canada?', 'Geography','Ottawa', 'Toronto', 'Montreal', 'Vancouver', '', 1),
(3, 'What is the capital city of Japan?', 'Geography','Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', '', 1),
(4, 'What is the capital city of Austrailia?', 'Geography','Canberra', 'Sydney', 'Perth', 'Melbourne', '', 1),
(5, 'What is the capital city of Brazil?', 'Geography','Brasília', 'Salvador', 'São Paulo', 'Rio de Janeiro', '', 1),
(6, 'What is the capital city of India?', 'Geography','New Delhi', 'Bangalore', 'Kolkata', 'Mumbai', '', 1),
(7, 'What is the capital city of Argentina?', 'Geography','Buenos Aires', 'Mendoza', 'Rosario', 'Córdoba', '', 1),
(8, 'What is the capital city of South Africa?', 'Geography','Pretoria', 'Cape Town', 'Durban', 'Johannesburg', '', 1),
(9, 'What is the capital city of Russia?', 'Geography','Moscow', 'Saint Petersburg', 'Vladivostok', 'Novosibirisk', '', 1),
(10, 'What is the capital city of Kenya?', 'Geography','Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', '', 1),
(11, 'Which continent is Brazil located in?', 'Geography', 'South America', 'Africa', 'Europe', 'Asia', '', 2),
(12, 'What ocean is on the East coast of the United States?', 'Geography', 'Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', '', 2);
(13, 'Which is the largest ocean on Earth?', 'Geography', 'Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', '', 2);
(14, "What is the deepest known point in the world's oceans called?", 'Geography', 'Challenger Deep', 'Deep Abyss', 'Mariana Trench', 'Abyss of Calypso', '', 2);
(15, 'Which ocean is almost entirely located within the Arctic Circle?', 'Geography', 'Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', '', 2);
(16, 'Which of these continents is NOT bordered by the Indian Ocean?', 'Geography', 'South America', 'Australia', 'Asia', 'Africa', '', 2);
(17, 'Which is the largest continent by land area?', 'Geography', 'Asia', 'North America', 'South America', 'Africa', '', 2);
(18, 'Which continent is almost entirely covered by an ice sheet?', 'Geography', 'Antarctican', 'North America', 'Greenland', 'Europe', '', 2);
(19, 'Which continent is the Amazon rainforest primarily located in?', 'Geography', 'South America', 'Africa', 'Asia', 'Europe', '', 2);
(20, 'Which country is The Great Barrier Reef located off the coast of?', 'Geography', 'Australia', 'Fiji', 'Philippines', 'Indonesia', '', 2);

INSERT INTO games (game_id, name, subject, resource_url) VALUES
(1, 'World Capitals Challenge', 'Geography', 'https://example.com/resources/capitals'),
(2, 'Continents & Oceans Quiz', 'Geography', 'https://example.com/resources/continents');