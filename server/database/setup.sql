



INSERT INTO games (id, name, subject, resources_link) VALUES
(1, 'World Capitals Challenge', 'Geography', 'https://example.com/resources/capitals'),
(2, 'Continents & Oceans Quiz', 'Geography', 'https://example.com/resources/continents');


INSERT INTO users (id, name, email, password) VALUES
(1, 'Charlie Rivers', 'charlie@example.com', 'geoPass123'),
(2, 'Dana Hill', 'dana@example.com', 'exploreWorld456');


INSERT INTO questions (
    id, question, subject, answer, 
    wrong_answer_1, wrong_answer_2, wrong_answer_3, 
    points, image_url
) VALUES
(1, 'What is the capital of France?', 'Geography', 'Paris', 'Lyon', 'Marseille', 'Nice', 10, ''),
(2, 'Which continent is Brazil located in?', 'Geography', 'South America', 'Africa', 'Europe', 'Asia', 15, ''),
(3, 'What ocean is on the east coast of the United States?', 'Geography', 'Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', 10, '');


INSERT INTO scores (id, user_id, score, subject) VALUES
(1, 1, 20, 'Geography'),
(2, 2, 30, 'Geography');
