// importo express
const express = require("express");

// creo il router
const router = express.Router();

// importo il controller
const movieController = require("../controllers/movieController");

// index - GET /movies - lista di tutti i film
router.get("/", movieController.index);

// show - GET /movies/:id - dettagli di un singolo film
router.get("/:id", movieController.show);

module.exports = router;

// Postmann - aggiungo rotta index per lista film - testo su Postman e funziona corretamente

// aggiungo rotta show per i dettagli di un singolo film - testo su Postam e funziona corretamente
