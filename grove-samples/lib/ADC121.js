var i2c = require('i2c');

var ADC121 = function (bus, addr) {
  addr = addr || 0x55;
  var wire = new i2c(addr, { device: '/dev/i2c-' + bus });
  var init = [
    [ 0x02, 0x20 ],
  ];
  init.forEach(function (data) {
    wire.writeBytes(data[0], [ data[1] ], function (err) {});
  });

  this.wire = wire;
};

ADC121.prototype.getResult = function (cb) {
  var wire = this.wire;
  wire.readBytes(0x00, 2, function (err, res) {
    cb(res);
  });
};

ADC121.prototype.getVoltage = function (cb) {
  this.getResult(function (res) {
    cb(((res[0] & 0xf) << 8 | res[1]) * 3.0 * 2 / 4096)
  });
};

module.exports = ADC121;
