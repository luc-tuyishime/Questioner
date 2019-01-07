const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Questioner', message: 'Welcome to my Qestioner App' });
});

module.exports = router;
