const express = require('express');
const router = express.Router();
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response, next) => {
    try {
      topSpeakers = await speakerService.getList();
      return response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
