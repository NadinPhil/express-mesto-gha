/* eslint-disable no-undef */

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const {
  createUser, login,
} = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { validateCreateUser } = require('./middlewares/validation');
const { validateLogin } = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errors());

app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('CONNECTED!');

  await app.listen(PORT);

  console.log(`App listening on port ${PORT}`);
}
main();
