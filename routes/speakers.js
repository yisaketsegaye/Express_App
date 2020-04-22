const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.send('This is speakers list page');
  });

  router.get('/:shortName', (request, response) => {
    response.send(`This is speaker ${request.params.shortName}'s detail page`);
  });

  return router;
};
