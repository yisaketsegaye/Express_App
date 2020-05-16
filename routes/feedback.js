const express = require('express');
const { check, validationResult } = require('express-validator');

const validation = [
  check('name').trim().isLength({ min: 3 }).escape().withMessage(' A name is required'),

  check('email').trim().isEmail().normalizeEmail().withMessage('A valid email address is required'),

  check('title').trim().isLength({ min: 3 }).escape().withMessage(' A title is required'),

  check('message').trim().isLength({ min: 5 }).escape().withMessage(' A message is required'),
];

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbackService.getList();

      const errors = request.session.feedback ? request.session.feedback.errors : false;
      const message = request.session.feedback ? request.session.feedback.message : false;

      // reseting the object after getting the error
      request.session.feedback = {};
      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedbacks,
        errors,
        message,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', validation, async (request, response, next) => {
    const errors = validationResult(request);

    try {
      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect('/feedback');
      }

      const { name, email, title, message } = request.body;

      await feedbackService.addEntry(name, email, title, message);
      request.session.feedback = {
        message: 'Thanks for the feedback',
      };
      return response.redirect('/feedback');
    } catch (err) {
      return next(err);
    }
  });

  router.post('/api', validation, async (request, response) => {
    try {
      const error = validationResult(request);

      if (!error.isEmpty()) {
        return response.json({ error: errors.array() });
      }

      const { name, email, title, message } = request.body;

      await feedbackService.addEntry(name, email, title, message);
      const feedbacks = feedbackService.getList();
      return response.json({ feedback });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
