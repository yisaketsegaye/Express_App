const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
  });

  router.get('/:shortName', (request, response) => {
    response.send(`This is speaker ${request.params.shortName}'s detail page`);
  });

  return router;
};
