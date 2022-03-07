/* eslint-disable no-undef */

const express = require('express');
const mongoose = require('mongoose');
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6225a0143e594bf412a187a9'
  };

  next();
});

app.use(express.json())
app.use('/', userRoutes)
app.use('/', cardRoutes)

async function main() {

  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('CONNECTED!')

  await app.listen(PORT)

  console.log(`App listening on port ${PORT}`)

}
main();