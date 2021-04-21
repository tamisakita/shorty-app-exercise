const express = require('express');
const Url = require('../models/Url');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', async (request, response) => {
  try {
    const data = await Url.find({ owner: '60808225b7b57b36d34820e6' }).populate('owner');

    console.log(data);

    response.render('dashboard', { data, owner: data[0].owner });
  } catch (error) {
    console.log(error);
  }
});

router.post('/url/create', async (request, response) => {
  const { protocol, redirectUrl, expirationDate } = request.body;

  const dateToArray = expirationDate.split('-');

  const dateMs = new Date(dateToArray[0], +dateToArray[1] - 1, dateToArray[2]).getTime();

  const newUrl = new Url({
    redirectUrl: protocol + redirectUrl,
    shortUrl: 'http://localhost:3000/s',
    expirationDateMs: dateMs,
    owner: '60808225b7b57b36d34820e6',
  });

  newUrl.shortUrl += '/' + newUrl._id;

  await newUrl.save();

  response.redirect('/dashboard');
});

module.exports = router;
