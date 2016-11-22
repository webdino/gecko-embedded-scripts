var ADC121 = require('../lib/ADC121');
var I2C_BUS = 0;

console.log("Please connect ADC module to I2C bus " + I2C_BUS + ".");
var adc = new ADC121(I2C_BUS);

setInterval(function () {
  adc.getVoltage(function (v) {
    console.log(v);
  });
}, 1000);
