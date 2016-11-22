var ADC121 = require('../lib/ADC121');
var I2C_BUS = 0;
var I2C_ADDR = 0x55;

console.log("Please connect ADC module to I2C bus " + I2C_BUS + " address " + I2C_ADDR + ".");
var adc = new ADC121(I2C_BUS, I2C_ADDR);

setInterval(function () {
  adc.getVoltage(function (v) {
    console.log(v);
  });
}, 1000);
