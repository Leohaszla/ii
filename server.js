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

app.get('/auth/instagram/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send('لم يتم استلام كود من انستغرام.');
  }

  try {
    const params = new URLSearchParams();
    params.append('client_id', INSTAGRAM_APP_ID);
    params.append('client_secret', INSTAGRAM_APP_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', REDIRECT_URI);
    params.append('code', code);

    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: params
    });

    const tokenData = await tokenResponse.json();
    console.log('Token data:', tokenData);

    if (tokenData.access_token) {
      res.send('تم ربط الحساب بنجاح! معرف المستخدم: ' + tokenData.user_id);
    } else {
      res.send('حدث خطأ أثناء استبدال الكود: ' + JSON.stringify(tokenData));
    }
  } catch (error) {
    console.error(error);
    res.send('حدث خطأ بالسيرفر: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
