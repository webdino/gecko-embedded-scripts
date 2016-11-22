var GPIO = require('../lib/GPIO');
var GPIO_PINS = "ABCDEFGHIJKL";

console.log("Please connect any GPIO input modules.");

var gpio = [];
for (var i in GPIO_PINS) {
  gpio[i] = new GPIO(GPIO_PINS.charAt(i));
}

console.log(' ' + GPIO_PINS.split('').join(' '));
setInterval(function () {
  var val = '';
  gpio.forEach(function (pin) {
    val += ' ' + pin.in();
  });
  console.log(val);
}, 1000);
