var GPIO = require('../lib/GPIO');

var button = new GPIO('A');
var led = new GPIO('G');

setInterval(function () {
  led.out(button.in());
}, 100);
