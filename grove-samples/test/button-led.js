var GPIO = require('../lib/GPIO');
var GPIO_IN_PIN  = 'E';
var GPIO_OUT_PIN = 'G';

console.log("Please connect GPIO input module to GPIO pin " + GPIO_IN_PIN + ".");
var button = new GPIO(GPIO_IN_PIN);
console.log("Please connect GPIO output module to GPIO pin " + GPIO_OUT_PIN + ".");
var led = new GPIO(GPIO_OUT_PIN);

setInterval(function () {
  led.out(button.in());
}, 100);
