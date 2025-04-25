const db = require("../database/connect");

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
        return response.rows;
    }

    static async getAllResourceUrls() {
        const response = await db.query("SELECT name, resource_url FROM games;");

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

    static async getAllQuestionsByGame(gameId) {
        const response = await db.query("SELECT * FROM questions WHERE game_id = $1", [gameId]);

        if (response.rows.length === 0) {
            throw new Error("No questions found for quiz.");
        }
        return response.rows.map(q => new Question(q));
    }
}

module.exports = Game;