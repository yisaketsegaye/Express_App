const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const speaker = await speakerService.getSpeaker(request.params.shortname);
      const speakerArtwork = await speakerService.getArtworkForSpeaker(request.params.shortname);

      return response.render('layout', {
        pageTitle: 'Speakers-details',
        template: 'speakers-detail',
        speaker,
        speakerArtwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
