const Article = require('../models/article');
const BadReqErr = require('../errors/BadReqErr');

module.exports.getSavedArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

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
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadReqErr(err.message.replace(/^.+: /g, ''));
        next(error);
      }
    });
};

module.exports.deleteSavedArticle = (req, res, next) => {
  Article.ownerArticleDeletion(req.params._id, req.user._id)
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};
