const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    response.json(speakers);
  });

  router.post('/', (request, response) => {
    response.send('Thanks for the feedback!!');
  });

  return router;
};
