const express = require('express');

const router = express.Router();

router.get('/home', (req, res) => {
  res.render('Welcome to questioner app');
});

module.exports = router;
