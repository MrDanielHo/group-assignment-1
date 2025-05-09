const db = require("../database/connect");

class User {
  constructor({ user_id, username, password }) {
    this.id = user_id;
    this.username = username;
    this.password = password;
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE user_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getTopUserScores() {
    const response = await db.query("SELECT * FROM users WHERE isAdmin = FALSE ORDER BY score DESC LIMIT 5;");

    if (response.rows.length === 0) {
        throw new Error("No user scores found.");
    }
    return response.rows.map(u => new User(u));
  }

  static async updateUserScoreById(data) {
    const updatedUser = await User.getOneById(data.id);

    const response = await db.query("UPDATE users SET score = $1 WHERE id = $2 RETURNING id, score;", [updatedUser.score + parseInt(data.score), data.id]);

    if (response.rows.length != 1) {
        throw new Error("Unable to update User score.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password } = data;
    let response = await db.query(
      "INSERT INTO user_account (username, password) VALUES ($1, $2) RETURNING user_id;",
      [username, password]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
