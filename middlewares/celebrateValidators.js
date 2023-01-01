const { celebrate, Joi } = require("celebrate");

const urlValidator =
  /http(s?):\/\/(www\.)?((\w|[a-яё]|-)+((\.(\w|[a-яё]|-)+){1,4})?\.(\w|[a-яё]|-)+)(:(\d{2,5}))?(\w|\/|\\)+#?/;
const passValidator =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;

const error = require("../helpers/Errors");
const message = require("../constants/ErrorMessages");

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .error(new error.BadRequest(message.BAD_EMAIL)),
    password: Joi.string()
      .required()
      .min(6)
      .error(new error.BadRequest(message.SHORT_PASS)),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .error(new error.BadRequest(message.BAD_EMAIL)),
    password: Joi.string()
      .pattern(new RegExp(passValidator))
      .required()
      .min(6)
      .error(new error.BadRequest(message.BAD_PASS)),
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .error(new error.BadRequest(message.BAD_NAME)),
  }),
});

const createValid = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string()
      .pattern(new RegExp(urlValidator))
      .required()
      .error(new error.BadRequest(message.BAD_URL)),
    image: Joi.string()
      .pattern(new RegExp(urlValidator))
      .required()
      .error(new error.BadRequest(message.BAD_URL)),
  }),
});

const idValid = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .length(24)
      .error(new error.BadRequest(message.BAD_ID)),
  }),
});

module.exports = {
  signIn,
  signUp,
  idValid,
  createValid,
};
