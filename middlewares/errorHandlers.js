// error 404 - gestisce le rotte inesistenti
function error404(req, res, next) {
  res.status(404).json({
    message: "Pagina non trovata",
    success: false,
  });
}

// error 500 - gestisce gli errori interni del server
function error500(err, req, res, next) {
  res.status(500).json({
    message: "Errore interno del server",
    success: false,
  });
}

module.exports = { error404, error500 };
