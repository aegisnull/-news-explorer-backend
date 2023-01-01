const Article = require("../models/article");
const error = require("../helpers/Errors");
const message = require("../constants/ErrorMessages");

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((articles) =>
      res.status(201).send({
        _id: articles._id,
        keyword: articles.keyword,
        title: articles.title,
        text: articles.text,
        date: articles.date,
        source: articles.source,
        link: articles.link,
        image: articles.image,
      })
    )
    .catch(next);
};

module.exports.delArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .orFail(() => {
      throw new error.NotFound(message.ITEM_NOT_FOUND);
    })
    .then(() =>
      Article.deleteOne({ _id: req.params.id, owner: req.user._id })
        .orFail(() => {
          throw new error.Forbidden(message.FORBIDDEN);
        })
        .then(() => {
          res.send({ message: "Artículo eliminado" });
        })
    )
    .catch(next);
};
