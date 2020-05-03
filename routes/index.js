const express = require('express');
const router = express.Router();
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    topSpeakers = await speakerService.getList();
    response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
  });

  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
