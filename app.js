const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

let timerIds = [];

app.post('/start', (req, res) => {
  const { links, interval } = req.body;

  // Clear any existing timers
  timerIds.forEach(timerId => clearInterval(timerId));
  timerIds = [];

  links.forEach((url, index) => {
    const timerId = setInterval(() => {
      axios.get(url)
        .then(response => {
          console.log(`URL ${index + 1} hit successful: ${response.status}`);
        })
        .catch(error => {
          console.error(`Error hitting URL ${index + 1}: ${error.message}`);
        });
    }, interval * 1000);

    timerIds.push(timerId);
  });

  res.json({ success: true, message: 'Auto login started.' });
});

app.post('/stop', (req, res) => {
  // Clear all timers
  timerIds.forEach(timerId => clearInterval(timerId));
  timerIds = [];

  res.json({ success: true, message: 'Auto login stopped.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
