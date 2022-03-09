/* eslint-disable no-undef */
const express = require('express');
const cardRoutes = require('express').Router();
const {
  createCard, getCards, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');

cardRoutes.get('/cards', getCards);
cardRoutes.delete('/cards/:cardId', deleteCard);
cardRoutes.post('/cards', express.json(), createCard);
cardRoutes.put('/cards/:cardId/likes', putCardLike);
cardRoutes.delete('/cards/:cardId/likes', deleteCardLike);

exports.cardRoutes = cardRoutes;
