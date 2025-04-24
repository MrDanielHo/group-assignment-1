const db = require("../database/connect");

class User {
  constructor(id, name, email, password, isAdmin = false, score = 0) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin; // default to false - Rule enforced by dattabase
    this.score = score; // default to 0 - Rule enforced by dattabase
  }

  // Method to find all users (for admin)
  static async getAll() {
    const response = await db.query("SELECT * FROM users");
    if (response.rows.length === 0) {
      throw new Error("No users found.");
    }
    return response.rows.map(
      (u) => new User(u.id, u.name, u.email, u.isadmin, u.score)
    );
  }

  // Method to find user their id (for user scores)
  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return response.rows[0];
  }

  // Method to find user by email (for login)
  static async getOneByEmail(email) {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (response.rows.length !== 1) {
      throw new Error("Unable to locate user.");
    }
    const u = response.rows[0];
    return new User(u.id, u.name, u.email, u.password, u.isadmin, u.score);
  }

  static async getTopUserScores() {
    const response = await db.query(
      "SELECT name, score FROM users WHERE isAdmin = FALSE ORDER BY score DESC LIMIT 5;"
    );

    if (response.rows.length === 0) {
      throw new Error("No user scores found.");
    }
    return response.rows;
  }

  static async updateUserScoreById(data) {
    const updatedUser = await User.getOneById(data.id);
    const response = await db.query(
      "UPDATE users SET score = $1 WHERE id = $2 RETURNING id, score;",
      [updatedUser.score + parseInt(data.score), parseInt(data.id)]
    );

    if (response.rows.length != 1) {
      throw new Error("Unable to update User score.");
    }
    return response.rows[0];
  }

  // Method to create a new user (for registration)
  static async create(data) {
    const { name, email, password } = data;
    const response = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, password, isadmin, score;",
      [name, email, password]
    );
    const u = response.rows[0];
    return new User(u.id, u.name, u.email, u.password, u.isadmin, u.score);
  }
}

module.exports = User;
