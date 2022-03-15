/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');

exports.getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  user.findById(req.params.userId)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } next(new NotFoundError('Нет пользователя с таким id!'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при поиске пользователя!'));
      } else {
        next(err);
      }
    });
};

exports.getСurrentUser = (req, res, next) => {
  user.findOne({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } next(new NotFoundError('Нет пользователя с таким id!'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при поиске пользователя!'));
      } else {
        next(err);
      }
    });
};

exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  user.create({
    name, about, avatar, email, password: hash,
  })
    .then((user) => res.status(200).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует!'));
      } else {
        next(err);
      }
    });
};

exports.updateProfile = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  user.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id!'));
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя!'));
      } else {
        next(err);
      }
    });
};

exports.updateAvatar = async (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  user.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      } next(new NotFoundError('Нет пользователя с таким id!'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении автара!'));
      } else {
        next(err);
      }
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Токен некорректен!'));
    });
};
