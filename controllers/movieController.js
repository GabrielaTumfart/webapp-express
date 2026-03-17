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

module.exports = { index };
