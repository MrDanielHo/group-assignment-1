const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function register(req, res) {
  try {
    const data = req.body;

    // Generate a salt with a specific cost number
    // The cost factor controls how much time is needed to calculate a single hash
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Hash the password with the salt
    data["password"] = await bcrypt.hash(data.password, salt);
    console.log(data);
    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    // Check if the user exists
    const user = await User.getOneByUsername(data.username);
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the password with the hashed password
    const match = await bcrypt.compare(data.password, user.password);

    // If the password matches, create a JWT token
    // The payload can contain any data you want to include in the token
    if (match) {
      const payload = { username: user.username };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error generating token");
        }
        res.status(200).json({
          success: true,
          token: token,
        });
      };

      // Sign the token with a secret key and set an expiration time (1 hour)
      jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: 3600 },
        sendToken
      );
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
};
