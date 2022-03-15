/* eslint-disable no-undef */
const { card } = require('../models/card');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

exports.getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

exports.deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((data) => {
      if (data) {
        if (data.owner.equals(req.user._id)) {
          data.deleteOne({});
        } else {
          next(new ForbiddenError('Запрещено удалять карточки чужих пользователей!'));
        }
      } else {
        next(new NotFoundError('Карточка с указанным _id не найдена!'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки!'));
      } else {
        next(err);
      }
    });
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  card.create({ name, link, owner: ownerId })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки!'));
      } else {
        next(err);
      }
    });
};

exports.putCardLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards) {
        res.send({ data: cards });
      } else {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка!'));
      } else {
        next(err);
      }
    });
};

exports.deleteCardLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards) {
        res.send({ data: cards });
      } else {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка!'));
      } else {
        next(err);
      }
    });
};
