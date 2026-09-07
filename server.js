const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const VERIFY_TOKEN = "milano_secret_123"; // غيّرها لأي كلمة تبيها

app.get('/webhook/instagram', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
