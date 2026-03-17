// importo la connessione al database
const connection = require("../database/conn");

// creo la funzione per ottenere la lista dei film
function index(req, res) {
  // faccio la query per ottenere tutti i film
  const sql = "SELECT * FROM movies";

  // callback - gestisco il risultato  della query
  connection.query(sql, (err, results) => {
    // se c'è un errore restituiscimi 500
    if (err) {
      return res.status(500).json({
        message: "Errore nel recupero dei film.",
        success: false,
      });
    }
    res.json({
      message: "Lista film recuperata con successo Gabriela!",
      success: true,
      results: results,
    });
  });
}

// Show - GET /movies/:id - Restituisce un singolo film in formato JSON
function show(req, res) {
  const movieId = parseInt(req.params.id);
  const sql = "SELECT * FROM movies WHERE id = ?";

  // callback - gestisco il risultado della query
  connection.query(sql, [movieId], (err, results) => {
    // se c'è un errore restituiscimi 500
    if (err) {
      return res.status(500).json({
        message: "Errore nel recupero del film",
        success: false,
      });
    }

    // se il film non esiste restituiscimi 404
    if (results.length === 0) {
      return res.status(404).json({
        message: `ERRORE 404 - Film ${movieId} non trovato`,
        success: false,
      });
    }

    // restituiscimi il film
    res.json({
      message: "Film recuperato con successo",
      success: true,
      result: results[0],
    });
  });
}

module.exports = { index, show };
