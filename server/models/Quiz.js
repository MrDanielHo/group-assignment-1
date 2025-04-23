const db = require("../database/connect");

class Quiz {
  constructor(data) {
    this.id = data.id,
    this.question = data.question,
    this.subject = data.subject,
    this.answer = data.answer,
    this.wrong_answer_1 = data.wrong_answer_1,
    this.wrong_answer_2 = data.wrong_answer_2,
    this.wrong_answer_3 = data.wrong_answer_3
  }
  
  async updateScore(data) {
    data.score = this.score + 1
    try {
      const response = await db.query("UPDATE users SET score = $1 WHERE id = $2 RETURNING *", [data.score, this.id])
      return new User(response.rows[0])
    } catch (err) {
      throw new Error(err.message)
    }
  }

}

module.exports = Quiz