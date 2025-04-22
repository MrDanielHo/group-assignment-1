DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS learing_resouces;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    admin BOOLEAN DEFAULT FALSE NOT NULL,
    score INT DEFAULT 0,
    PRIMARY KEY(user_id)
);

CREATE TABLE learing_resouces (
    resource_id INT GENERATED ALWAYS AS IDENTITY,
    subject VARCHAR(100) NOT NULL, 
    answer VARCHAR(100) NOT NULL,
    fact1 VARCHAR(255) NOT NULL, 
    fact2 VARCHAR(255) NOT NULL, 
    fact3 VARCHAR(255) NOT NULL,
    fact4 VARCHAR(255) NOT NULL,
    fact5 VARCHAR(255) NOT NULL,
    fact6 VARCHAR(255) NOT NULL, 
    PRIMARY KEY(resouce_id)
);


INSERT INTO users (name, email, password, admin, score) 
VALUES 
    ('Administrator', 'the_admin@lafosse.com', 'admin', TRUE, '0')
    ('Derek Dyson', 'd.dyson@lafosse.com', 'test123!', FALSE, '0'),
    ('Stephen Miller', 'miller@lafosse.com', 'test456!', FALSE, '10'),
    ('Karen Smith', 'smitherson@lafosse.com', '123test321!', FALSE, '20'),
    ('Georgie Pang', 'd.dyson@lafosse.com', 'test123!', FALSE, '50'),
    ('Alexa Lemon', 'd.dyson@lafosse.com', 'test123!', FALSE, '200');


INSERT INTO learning_resouces (subject, answer, fact1, fact2, fact3)
VALUES ('geography', 'United Kingdom', 'Hosted the 2012 Summer Olympics', 'Birthplace of football', 'Is made up of 4 countries'),
('geography', 'France', 'The world''s most visited country', 'Home to the highest mountain in Europe', 'The largest country in Western Europe'),
('geography', 'Germany', 'Invented the gummy bear', 'Where mainland Europe''s longest river begins', 'The first country to fully implement daylight saving hours'),
('geography', 'Spain', 'Surrounded by the Mediterranean Sea, the Atlantic ocean, and the Cantabrian Sea', 'Home to the oldest restaurant in the world', 'Cathedral still in construction since 1882'),
('english literature', 'Shakespeare','To thine own self be true', 'We are such stuff as dreams are made on', 'To be, or not to be, that is the question')
('history', 'William the Conqueror', 'Built the Tower of London in 1078', 'Commissioned a comprehensive survey of land and resources in 1085', 'Claimed the English throne after the Battle of Normandy in 1066')