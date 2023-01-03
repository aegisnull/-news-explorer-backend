const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./middlewares/errorHandler.js');

const limiter = require('./middlewares/limiter.js');
const NotFoundErr = require('./errors/NotFoundErr.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

/* inclúyelos antes de otras rutas */
app.use(cors());
app.options('*', cors()); /* habilitar las solicitudes de todas las rutas */

const { PORT, DB_LINK } = require('./config');
/* express.json() is a method inbuilt in express to recognize the incoming Request as a JSON */
app.use(express.json());

mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log(err));

app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(bodyParser.json());

app.use('/', indexRoutes);

/* set route for Non-existent address or localhost:3000 */
app.use('/', (res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
