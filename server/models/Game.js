const db = require("../database/connect");

const User = require("./User");
const Question = require("./Question");

class Game {
    constructor(gameId, name, subject, resourceUrl) {
        this.gameId = gameId;
        this.name = name;
        this.subject = subject;
        this.resourceUrl = resourceUrl;
    }

    static async getAllGames() {
        const response = await db.query("SELECT * FROM games;");

        if (response.rows.length === 0) {
            throw new Error("No games found");
        }
        return response.rows.map(g => new Game(g));
    }

    static async getAllResourceUrls() {
        const response = await db.query("SELECT resource_url FROM games;");

        if (response.rows.length === 0) {
            throw new Error("No resources found.");
        }
        return response.rows;
    }

    static async getResourceUrlBySubject(data) {
        const response = await db.query("SELECT resource_url FROM games WHERE subject = $1;", [data.subject]);

        if (response.rows.length === 0) {
            throw new Error("No resources found.");
        }
        return response.rows;
    }

    static async getTopUserScores() {
        const response = await db.query("SELECT * FROM users WHERE isAdmin = FALSE ORDER BY score LIMIT 5;");

        if (response.rows.length === 0) {
            throw new Error("No user scores found.");
        }
        return response.rows.map(u => new User(u));
    }

    static async updateUserScoreById(data) {
        // First retrieve the user whose score is being updated using their id from the (request) data object
        const updatedUser = await User.getOneById(data.id);

        const response = await db.query("UPDATE users SET score = $1 WHERE id = $2 RETURNING id, score;", [updatedUser.score + parseInt(data.score), data.id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to update User score.");
        }
        return new User(response.rows[0]);
    }

    static async getAllQuestionsByGame(gameId) {
        const response = await db.query("SELECT * FROM questions WHERE game_id = $1", [gameId]);

        if (response.rows.length === 0) {
            throw new Error("No questions found for quiz.");
        }
        return response.rows.map(q => new Question(q));
    }
}

module.exports = Game;