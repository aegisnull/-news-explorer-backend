const router = require('express').Router();

const {
  getArticles,
  createArticle,
  delArticle,
} = require('../controllers/articles');
const { idValid, createValid } = require('../middlewares/celebrateValidators');

router.get('/', getArticles);
router.post('/', createValid, createArticle);
router.delete('/:id', idValid, delArticle);

module.exports = router;
