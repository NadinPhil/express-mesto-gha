const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required(),

    about: Joi.string().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
    name: Joi.string().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required(),

  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30).required(),

    name: Joi.string().min(2).max(30).required(),

  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }).message({
      'any.required': 'Поле "link" должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateCardLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

module.exports = validateCardLike;
module.exports = validateCreateCard;
module.exports = validateDeleteCard;
module.exports = validateCreateUser;
module.exports = validateLogin;
module.exports = validateGetUserById;
module.exports = validateUpdateProfile;
module.exports = validateUpdateAvatar;
