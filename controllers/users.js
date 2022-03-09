/* eslint-disable no-undef */
const { user } = require('../models/user');

const ERROR_BR = 400;
const ERROR_NF = 404;
const ERROR_SERVER = 500;

exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' }));
};

exports.getUserById = (req, res) => {
  user.findById(req.params.userId)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(ERROR_NF).send({ message: 'Пользователь по указанному _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные при поиске пользователя' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

exports.updateProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  user.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((users) => {
      if (!users) {
        return res.status(ERROR_NF).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.status(200).send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

exports.updateAvatar = async (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  user.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((users) => {
      if (users) {
        return res.status(200).send({ data: users });
      } return res.status(ERROR_NF).send({ message: 'Пользователь с указанным _id не найден.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};
