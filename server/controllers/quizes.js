const Quiz = require("../models/Quiz");

const update = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const snack = await Quiz.getOneById(id);
      const result = await snack.update(data);
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ "error": err.message })
    }
  }
  
module.exports = update