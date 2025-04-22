const db = require('../database/connect')

class User {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.password = data.password
    // this.score = data.score // why isn't user score in the user table?
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM users;");
    if (response.rows.length === 0) {
      throw new Error("No users available.")
    }
    return response.rows.map(g => new User(g));
  }
}

module.exports = User