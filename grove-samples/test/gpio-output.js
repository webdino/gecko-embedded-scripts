var GPIO = require('../lib/GPIO');
var GPIO_PINS = "ABCDEFGHIJKL";

console.log("Please connect any GPIO output modules.");

var gpio = [];
for (var i in GPIO_PINS) {
  gpio[i] = new GPIO(GPIO_PINS.charAt(i));
}

setInterval(function () {
  gpio.forEach(function (pin) {
    pin.out(1);
    setTimeout(function () { pin.out(0); }, 500);
  });
}, 1000);
