function log(req, res, next) {
  console.log('Looging...');
  next();
}

module.exports = log;
