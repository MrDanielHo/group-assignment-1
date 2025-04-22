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

//   static async getTopScore() {
//     const response = await db.query("SELECT * FROM snacks ORDER BY votes DESC LIMIT 5;");
//     if (response.rows.length != 1) {
//       throw new Error("Unable to locate top scorers.")
//     }
//     return new Snack(response.rows[0]);
//   }

  static async findById(user_id) {
    try {
      const userData = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id])
      const user = new User(userData.rows[0]);
      return user;
    } catch (err) {
      throw new Error('User does not exist.');
    }
  }

  static async create(data) {
    if (!data.name || !data.email || !data.password) {
       throw new Error("Information is missing")
      }
    const { name, email, password } = data;
    const user = await db.query("SELECT email FROM users WHERE LOWER(email) = LOWER($1)", [email])
    if (user.rows.length === 0){
    const response = await db.query("INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *;", [name, email, password])
    return new User(response.rows[0])
    } else {
      throw new Error ('Email address already registered.\nPlease submit a forgotten password request.')
    }
  }

  async updateName(data) {
    if (!data.name) {
      throw new Error("Missing name")
    }
    try {
      const response = await db.query("UPDATE users SET name = $1 WHERE id = $2 RETURNING *", [data.name, this.id])
      return new User(response.rows[0])
    } catch (err) {
      throw new Error(err.message)
    }
  }
  
  async updatePassword(data) {
    if (!data.password) {
      throw new Error("Missing password")
    }

    try {
      const response = await db.query("UPDATE users SET password = $1 WHERE id = $2 RETURNING *", [data.password, this.id])
      return new User(response.rows[0])
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async destroy() {
    try {
      const response = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [this.id])
      return new User(response.rows[0])
    } catch(err) {
      throw new Error("Cannot delete.")
    }
  }
}

module.exports = User