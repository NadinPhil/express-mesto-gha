/* eslint-disable no-undef */
const userRoutes = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getСurrentUser,
} = require('../controllers/users');
const { validateGetUserById } = require('../middlewares/validation');
const { validateUpdateProfile } = require('../middlewares/validation');
const { validateUpdateAvatar } = require('../middlewares/validation');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/me', getСurrentUser);
userRoutes.get('/users/:userId', validateGetUserById, getUserById);
userRoutes.patch('/users/me', validateUpdateProfile, updateProfile);
userRoutes.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

exports.userRoutes = userRoutes;
