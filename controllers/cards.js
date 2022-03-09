/* eslint-disable no-undef */
const { card } = require('../models/card');

const ERROR_BR = 400;
const ERROR_NF = 404;
const ERROR_SERVER = 500;

exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' }));
};

exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(ERROR_NF).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные при удалении карточки' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  card.create({ name, link, owner: ownerId })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные при создании карточки' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

exports.putCardLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards) {
        res.send({ data: cards });
      } else {
        res.status(ERROR_NF).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};

exports.deleteCardLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards) {
        res.send({ data: cards });
      } else {
        res.status(ERROR_NF).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BR).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } return res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    });
};
