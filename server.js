const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const cookieSession = require('cookie-session');
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');

const speakerService = new SpeakerService('./data/speakers.json');
const feedbackService = new FeedbackService('./data/feedback.json');

const app = express();
const port = 3000;

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghrusfsfe2434', '24fiudfhsi3re9nohhu'],
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.name = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakerService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    speakerService,
    feedbackService,
  })
);

app.listen(port, () => {
  console.log(`Express server listning ${port}`);
});
