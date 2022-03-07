/* eslint-disable no-undef */
const express = require('express');
const userRoutes = require('express').Router();
const { createUser, getUsers, getUserById, updateProfile, updateAvatar } = require('../controllers/users');


userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUserById);
userRoutes.post('/users', express.json(),  createUser);
userRoutes.patch('/users/me', updateProfile);
userRoutes.patch('/users/me/avatar', updateAvatar);


exports.userRoutes = userRoutes;