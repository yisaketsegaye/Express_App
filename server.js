const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');

const speakerService = new SpeakerService('./data/speakers.json');
const feedbackService = new FeedbackService('./data/feedback.json');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));
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
