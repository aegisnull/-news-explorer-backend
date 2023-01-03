// Constants declaration
/* const NEWS_URL = "https://newsapi.org/v2"; */
const PROXY_URL = 'https://nomoreparties.co/news/v2';
const API_KEY = 'ed4390ffc54146c7a2ff5ea1673c8b01';
const https = require('https');
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toDateString();
const today = new Date().toDateString();

const getUrl = (query) => {
  return fetch(
    `${PROXY_URL}/everything?q=${query}&from=${sevenDaysAgo}&to=${today}&pageSize=100&apiKey=${API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }
  );
};

module.exports.getNews = (req, res) => {
  https
    .get(getUrl(req.body.query), options, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        console.log(JSON.parse(data));
        res.send(JSON.parse(data));
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
};
