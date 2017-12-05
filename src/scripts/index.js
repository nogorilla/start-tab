'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/fonts.scss';
import '../styles/index.scss';

const Clock = require('./clock');
const Weather = require('./weather');
