const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.getOneById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).send({ email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (match) {
      const payload = { email: user.email };
      jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw new Error("Error generating token");
          res.status(200).json({ success: true, token });
        }
      );
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function getTopScores(req, res) {
  try {
    const topScores = await User.getTopUserScores();
    res.status(200).json(topScores);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function getUserScore(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.getOneById(userId);
    res.status(200).json(user.score); // Returns an integer score
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function updateUserScore(req, res) {
  try {
    const user = await User.updateUserScoreById(req.body);
    res.status(200).json(user); // Returns an object containing a user's id and updated score
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

module.exports = {
  register,
  login,
  getTopScores,
  getUserScore,
  updateUserScore,
  getAllUsers,
  getUserById,
};

