const express = require("express");
const moongose = require("mongoose");
let cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// inclúyelos antes de otras rutas
app.use(cors());
app.options("*", cors()); //habilitar las solicitudes de todas las rutas

const { PORT, DB_LINK } = require("./config");
const app = express();
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

//urlencoded() method within express. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

const { errLogger, reqLogger } = require("./middlewares");

moongose
  .connect(DB_LINK)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log(err));

const router = require("./routes");

// set route for Non-existent address or localhost:3000
app.use("/", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(reqLogger);
app.use(limiter);
app.use(router);
app.use(errLogger);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
