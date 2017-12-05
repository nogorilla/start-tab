'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/fonts.scss';
import '../styles/index.scss';

import { Clock } from './clock';

const Weather = require('./weather');
const moment = require('moment');

// WEATHER
const retrieveWeather = () => {
  Weather.getCurrent('Cincinnati')
    .then((data) => {
      document.getElementById('temp').innerText = `${data.temp}°F`;
      document.getElementById('desc').innerText = data.desc;
      localStorage.setItem('weather-check', moment().unix());
      localStorage.setItem('weather', JSON.stringify(data));
      console.log('weather from api');
    });
};
const loadWeather = () => {
  let lastCheck = localStorage.getItem('weather-check');
  if (lastCheck !== 'undefined') {
    if (moment().isAfter(moment.unix(parseInt(lastCheck)).add(30, 'm'))) {
      retrieveWeather();
    } else {
      let data = JSON.parse(localStorage.getItem('weather'));
      document.getElementById('temp').innerText = `${data.temp}°F`;
      document.getElementById('desc').innerText = data.desc;
      console.log('weather from localStorage');
    }
  } else {
    retrieveWeather();
  }
};
const weather = document.getElementById('weather');
weather.addEventListener('click', retrieveWeather);
loadWeather();
setInterval(loadWeather, 1.8e+6);
