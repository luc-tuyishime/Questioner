function log(req, res, next) {
  console.log('Loging...');
  next();
}

module.exports = log;
