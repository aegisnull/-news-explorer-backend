const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();

/* inclúyelos antes de otras rutas */
app.use(cors());
app.options('*', cors()); /* habilitar las solicitudes de todas las rutas */

const { PORT, DB_LINK } = require('./config');
/* express.json() is a method inbuilt in express to recognize the incoming Request as a JSON */
app.use(express.json());

/* urlencoded() method within express. This method is called as a middleware
in your application using the code: app.use(express.urlencoded()); */
app.use(express.urlencoded({ extended: true }));

const { errLogger, reqLogger } = require('./middlewares/logger');

mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log(err));

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');

app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

/* set route for Non-existent address or localhost:3000 */
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.use(helmet());
app.use(cookieParser());
app.use(reqLogger);
app.use(errLogger);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
