// importo express
const express = require("express");

// importo dotenv per leggere il file .env
require("dotenv").config();

// creo l'app express
const app = express();

// SERVER START
app.listen(process.env.APP_PORT, () => {
  // mostra l'ambiente e l'url del server
  console.log("Server enviroment: " + process.env.APP_MODE);
  console.log(
    "Server listening on " + process.env.APP_URL + ":" + process.env.APP_PORT
  );
});
