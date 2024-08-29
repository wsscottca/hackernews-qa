const express = require('express');
const { getArticles } = require('../controllers/articleController');

const router = express.Router();

/**
 * Route to get articles
 */
router.get('/', getArticles);

module.exports = router;
