const User = require("../models/User");

const index = async (req, res) => {
  try {
    const data = await User.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
}

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getOneById(id);
    res.status(200).json({data: snack});
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const user = await User.create(data);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
}

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const user = await User.getOneById(id);
    const result = await user.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getOneById(id);
    await user.destroy();
    res.status(204).end;
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

module.exports = {
  index, show, create, update, destroy
}
