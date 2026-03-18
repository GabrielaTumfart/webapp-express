// importo express
const express = require("express");

// importo cors
const cors = require("cors");

// importo dotenv per leggere il file .env
require("dotenv").config();

// importo la connessione al database
const connection = require("./database/conn");

// verifico la connesione al database
connection.connect((err) => {
  if (err) {
    console.log("Errore di connessione al database: " + err.message);
    return;
  }
  console.log("Database connesso Gabriela!");
});

// creo l'app express
const app = express();

// abilito cors
app.use(cors());

// ROUTES
const movieRouter = require("./routers/movieRouter");
app.use("/movies", movieRouter);

// ERROR MIDDLEWARES
const errorMiddleware = require("./middlewares/errorHandlers");
app.use(errorMiddleware.error404);
app.use(errorMiddleware.error500);

// SERVER START
app.listen(process.env.APP_PORT, () => {
  // mostra l'ambiente e l'url del server
  console.log("Server enviroment: " + process.env.APP_MODE);
  console.log(
    "Server listening on " + process.env.APP_URL + ":" + process.env.APP_PORT
  );
});
