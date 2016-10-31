var GPIO = require('../lib/GPIO');

var gpio = [];
gpio[0] = new GPIO('A');
gpio[1] = new GPIO('B');
gpio[2] = new GPIO('C');
gpio[3] = new GPIO('D');
gpio[4] = new GPIO('E');
gpio[5] = new GPIO('F');
gpio[6] = new GPIO('G');
gpio[7] = new GPIO('H');
gpio[8] = new GPIO('I');
gpio[9] = new GPIO('J');
gpio[10] = new GPIO('K');
gpio[11] = new GPIO('L');

setInterval(function () {
  gpio.forEach(function (pin) {
    pin.out(1);
    setTimeout(function () { pin.out(0); }, 500);
  });
}, 1000);
