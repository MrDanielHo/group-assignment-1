const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/resources');

router.get('/resources', gamesController.getResources);

module.exports = router;
