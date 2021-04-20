const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

router.get('/dashboard', (request, response) => {
  response.render('dashboard');
});

router.post('/url/create', (request, response) => {
  // console.log(request.body);
  const { protocol, redirectUrl, expirationDate } = request.body;

  const dateToArray = expirationDate.split('-');

  const dateMs = new Date(dateToArray[0], +dateToArray[1] - 1, dateToArray);
  console.log(dateMs);
});

module.exports = router;