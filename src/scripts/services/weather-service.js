import http from 'http';
import URL from 'url';

class WeatherService {
  constructor() {
    console.log('weather constructor');
    this.APIKEY = 'eadd12502a9e5df147d167dc44b814f7';
  }
  _getJSON(url, resolve, reject) {
    http.get(URL.parse(url), (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
          let data = JSON.parse(body);
          if (data.cod === 200) {
            let temp = Math.round(data.main.temp);
            let desc = data.weather[0].main;
            resolve({ temp: temp, desc: desc });
          } else {
            reject('failed to retrieve weather');
          }
      });
    }).on('error', (e) => {
      reject(e);
    });
  };

  getCurrent(city) {
    let url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + encodeURIComponent(city) + "&cnt=1";

    if (this.APIKEY) {
      url = url + "&APPID=" + this.APIKEY;
    } else {
      console.error('WARNING: You must set an apiKey for openweathermap');
    }

    return new Promise((resolve, reject) => {
      this._getJSON(url, resolve, reject);
    });
  };
}

module.exports = new WeatherService();