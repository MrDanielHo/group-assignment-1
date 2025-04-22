DROP TABLE IF EXISTS users, question;

CREATE TABLE question (
    question_id INT GENERATED ALWAYS AS IDENTITY,
    question VARCHAR(250) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    answer VARCHAR(250) NOT NULL,
    wrong_answer_1 VARCHAR(250) NOT NULL,
    wrong_answer_2 VARCHAR(250) NOT NULL,
    wrong_answer_3 VARCHAR(250) NOT NULL,
    points INT NOT NULL,
    image_url VARCHAR(300),
    PRIMARY KEY (question_id)
);
