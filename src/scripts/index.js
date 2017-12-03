'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/fonts.scss';
import '../styles/index.scss';

import { Clock } from './clock';

const Weather = require('./weather');

Weather.getCurrent('Cincinnati')
  .then((data) => {
    document.getElementById('weather').innerText = `temp: ${data.temp}; desc: ${data.desc}`;
  });