const gameController = require("../../../controllers/game");
const Game = require("../../../models/Game");
const Question = require("../../../models/Question");

// Mocking response methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = {
  status: mockStatus,
};

describe("Game Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("getAllGames", () => {
    it("should return all games", async () => {
      const mockGames = [
        {
          gameId: 1,
          name: "Game 1",
          subject: "Geography",
          resourceUrl: "http://example.com/game1",
        },
        {
          gameId: 2,
          name: "Game 2",
          subject: "History",
          resourceUrl: "http://example.com/game2",
        },
      ];

      jest.spyOn(Game, "getAllGames").mockResolvedValue(mockGames);

      await gameController.getAllGames(null, mockRes);

      expect(Game.getAllGames).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockGames);
    });

    it("should handle errors", async () => {
      const mockError = new Error("No games found");
      jest.spyOn(Game, "getAllGames").mockRejectedValue(mockError);

      await gameController.getAllGames(null, mockRes);

      expect(Game.getAllGames).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe("getAllQuestionsByGame", () => {
    it("should return all questions for a given game", async () => {
      const req = { params: { gameId: 1 } };
      const mockQuestions = [
        {
          id: 1,
          question: "What is the capital of France?",
          answer: "Paris",
        },
        {
          id: 2,
          question: "What is the largest planet in our solar system?",
          answer: "Jupiter",
        },
      ];

      jest
        .spyOn(Game, "getAllQuestionsByGame")
        .mockResolvedValue(mockQuestions);

      await gameController.getAllQuestionsByGame(req, mockRes);

      expect(Game.getAllQuestionsByGame).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestions);
    });

    it("should handle errors when no questions are found", async () => {
      const req = { params: { gameId: 999 } };
      const mockError = new Error("No questions found for quiz.");
      jest.spyOn(Game, "getAllQuestionsByGame").mockRejectedValue(mockError);

      await gameController.getAllQuestionsByGame(req, mockRes);

      expect(Game.getAllQuestionsByGame).toHaveBeenCalledWith(999);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: mockError.message });
    });
  });
  describe("checkAnswer", () => {
    it("should return correct answer", async () => {
      const req = {
        body: {
          questionId: 1,
          answer: "Paris",
        },
      };
      const mockQuestion = {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
      };

      jest.spyOn(Question, "getOneById").mockResolvedValue(mockQuestion);

      await gameController.checkAnswer(req, mockRes);

      expect(Question.getOneById).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ correct: true });
    });

    it("should return incorrect answer", async () => {
      const req = {
        body: {
          questionId: 1,
          answer: "London",
        },
      };
      const mockQuestion = {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
      };

      jest.spyOn(Question, "getOneById").mockResolvedValue(mockQuestion);

      await gameController.checkAnswer(req, mockRes);

      expect(Question.getOneById).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ correct: false });
    });

    it("should handle errors when question is not found", async () => {
      const req = {
        body: {
          questionId: 999,
          answer: "Paris",
        },
      };
      const mockError = new Error("No question found.");
      jest.spyOn(Question, "getOneById").mockRejectedValue(mockError);

      await gameController.checkAnswer(req, mockRes);

      expect(Question.getOneById).toHaveBeenCalledWith(999);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: mockError.message });
    });
  });
});
