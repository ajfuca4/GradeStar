function notFound(req, res) {
  res.status(404).render('errors/404.ejs');
}

module.exports = notFound;
