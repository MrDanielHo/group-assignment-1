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

    static async getAll() {
        const response = await db.query("SELECT * FROM questions ORDER BY id;");

        if (response.rows.length === 0) {
        throw new Error("No questions were found.")
        }

        return response.rows.map(q => new Question(q));
    }

    static async getOneById(questionId) {
        const response = await db.query("SELECT * FROM questions WHERE id = $1",
      [questionId]);

      if (response.rows.length != 1) {
        throw new Error("No question found.");
      }
      return new Question(response.rows[0]);
    }

}

module.exports = Question;