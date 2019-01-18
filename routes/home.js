const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Welcome to questioner app');
});

module.exports = router;
