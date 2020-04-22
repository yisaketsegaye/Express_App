const express = require('express');
const router = express.Router();
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/speaker', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
