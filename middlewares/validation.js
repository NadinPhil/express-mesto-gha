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
    password: Joi.string().required().min(8).max(30)
      .message({
        'string.min': 'Минимальная длина поля "password" - 8',
        'string.max': 'Максимальная длина поля "password" - 30',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }).unknown(true),
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
    password: Joi.string().required().min(8).max(30)
      .message({
        'string.min': 'Минимальная длина поля "password" - 8',
        'string.max': 'Максимальная длина поля "password" - 30',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }).unknown(true),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
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
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
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
  }).unknown(true),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }),
  }).unknown(true),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
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
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
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
  }).unknown(true),
});

const validateCardLike = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
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
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports = validateCardLike;
module.exports = validateCreateCard;
module.exports = validateDeleteCard;
module.exports = validateCreateUser;
module.exports = validateLogin;
module.exports = validateGetUserById;
module.exports = validateUpdateProfile;
module.exports = validateUpdateAvatar;
