var ADC121 = require('../lib/ADC121');

var adc = new ADC121(0);

setInterval(function () {
  adc.getVoltage(function (v) {
    console.log(v);
  });
}, 1000);
