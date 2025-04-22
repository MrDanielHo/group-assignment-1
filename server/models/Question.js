const db = require("../database/connect");

class Question {
    constructor({id, question, subject, answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, image_url, game_id}) {
        this.id = id;
        this.question = question;
        this.subject = subject;
        this.answer = answer;
        this.wrong_answer_1 = wrong_answer_1;
        this.wrong_answer_2 = wrong_answer_2;
        this.wrong_answer_3 = wrong_answer_3;
        this.image_url = image_url;
        this.game_id = game_id;
    }

    
}