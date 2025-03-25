const errorHandler = (err, req, res, next) => {

  console.log('Error :>> ', err.message);
  // console.log('Error :>> ', err.stack);

  return res.status(500).json({
    error: "Erreur serveur",
  });

};

module.exports = errorHandler;