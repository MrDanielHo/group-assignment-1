const { Router } = require('express');
const router = Router();
const quizController = require('../controllers/quizes')

router.patch('/:id', quizController.update)