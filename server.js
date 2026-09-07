const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const VERIFY_TOKEN = "milano_secret_123";
const INSTAGRAM_APP_ID = "1579440186866459"; 
const INSTAGRAM_APP_SECRET = "9a0096fc7052cc308c622a0e411856e6";
const REDIRECT_URI = "https://fearless-bravery-production.up.railway.app/auth/instagram/callback";

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

app.get('/auth/instagram/callback', (req, res) => {
  const code = req.query.code;
  console.log('Received code: ' + code);
  res.send('تم استلام تسجيل الدخول بنجاح. الكود: ' + code);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
