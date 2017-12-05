const WeatherService = require('./services/weather-service');
const moment = require('moment');

class Weather {
  constructor() {
    const weather = document.getElementById('weather');
    weather.addEventListener('click', this._get.bind(this));
    this._load();
    setInterval(this._load, 1.8e+6);
  };
  _get() {
    WeatherService.getCurrent('Cincinnati')
      .then((data) => {
        this._display(data);
        localStorage.setItem('weather-check', moment().unix());
        localStorage.setItem('weather', JSON.stringify(data));
        console.log('weather from api');
      });
  };
  _load() {
    let lastCheck = localStorage.getItem('weather-check');
    if (lastCheck !== 'undefined') {
      if (moment().isAfter(moment.unix(parseInt(lastCheck)).add(30, 'm'))) {
        this._get();
      } else {
        let data = JSON.parse(localStorage.getItem('weather'));
        this._display(data);
        console.log('weather from localStorage');
      }
    } else {
      this._get();
    }
  }
  _display(data) {
    document.getElementById('temp').innerText = `${data.temp}°F`;
    document.getElementById('desc').innerText = data.desc;
  }
}

module.exports = new Weather();