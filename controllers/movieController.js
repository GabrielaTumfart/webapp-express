// importo la connessione al database
const connection = require("../database/conn");

// creo la funzione per ottenere la lista dei film
function index(req, res) {
  // faccio la query per ottenere tutti i film
  const sql = `SELECT movies.*, AVG(reviews.vote) AS avg_vote
               FROM movies
               INNER JOIN reviews
               ON movies.id = reviews.movie_id
               GROUP BY movies.id`;

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
  const { id } = req.params;

  const movieSQL = `SELECT * FROM movies WHERE id = ?`;

  connection.query(movieSQL, [id], (err, movieResult) => {
    if (err) {
      return res.status(500).json({
        message: "Errore nel recupero del film",
        success: false,
      });
    }

    const [movie] = movieResult;

    if (!movie) {
      return res.status(404).json({
        message: `Film ${id} non trovato`,
        success: false,
      });
    }

    const reviewSQL = `SELECT * FROM reviews WHERE movie_id = ?`;

    connection.query(reviewSQL, [id], (err, reviewsResult) => {
      if (err) {
        return res.status(500).json({
          message: "Errore nel recupero delle recensioni",
          success: false,
        });
      }

      movie.reviews = reviewsResult;

      res.json({
        message: "Film recuperato con successo",
        success: true,
        result: movie,
      });
    });
  });
}
// storeReview - POST /movies/:id/review - salva una nuova recensione
function storeReview(req, res) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const storeReviewSQL = `
    INSERT INTO reviews
    (movie_id, name, vote, text) VALUES
    (?, ?, ?, ?);
  `;

  connection.query(storeReviewSQL, [id, name, vote, text], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Errore nel salvare la recensione",
        success: false,
      });
    }
    const { insertId } = result;
    res.status(201).json({ insertId });
  });
}

module.exports = { index, show, storeReview };
