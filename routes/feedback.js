const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response) => {
    const feedbacks = await feedbackService.getList();
    response.json(feedbacks);
  });

  router.post('/', (request, response) => {
    response.send('Thanks for the feedback!!');
  });

  return router;
};
