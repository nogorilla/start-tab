const moment = require('moment');

class Clock {
  constructor() {
    this._display();
    setInterval(this._display.bind(this), 580);
  }

  _display() {
    let dateDiv  = document.getElementById('date'),
        timeDiv  = document.getElementById('time'),
        dayDiv   = document.getElementById('day'),
        dateTime = this._getTime();

    dateDiv.innerHTML = dateTime.date;
    timeDiv.innerHTML = dateTime.time;
    dayDiv.innerHTML  = dateTime.day;
  }

  _getTime() {
    const dt = moment();
    return {
      date: dt.format('MMMM D, YYYY'),
      day:  dt.format('dddd'),
      time: dt.format('h:mm a')
    };
  }
}

module.exports = new Clock();