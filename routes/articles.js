const router = require("express").Router();

const {
  getArticles,
  createArticle,
  delArticle,
} = require("../controllers/articles");
const { idValid, createValid } = require("../middlewares");

router.get("/articles", getArticles);
router.post("/articles", createValid, createArticle);
router.delete("/articles/:id", idValid, delArticle);

module.exports = router;
