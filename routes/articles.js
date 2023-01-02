const router = require('express').Router();

const { getArticles, createArticle, delArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:id', delArticle);

module.exports = router;
