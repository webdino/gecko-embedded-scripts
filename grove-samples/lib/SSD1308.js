var i2c = require('i2c');

var SSD1308 = function (bus) {
  var wire = new i2c(0x3c, { device: '/dev/i2c-' + bus });

  var init = [ 0xae, 0xa1, 0xda, 0x12, 0xc8, 0xa8, 0x3f, 0xd5, 0x80, 0x81,
    0x50, 0xd9, 0x21, 0x20, 0x02, 0xdb, 0x30, 0xad, 0x00, 0xa4, 0xa6 ];
  writeCmd(wire, init);

  this.wire = wire;
};

function writeCmd(wire, cmd) {
  cmd.forEach(function (byte) {
    wire.writeBytes(0x80, [ byte ], function (err) {});
  });
}

function writeData(wire, data) {
  while (data.length > 0) {
    wire.writeBytes(0x40, data.splice(0, 32), function (err) {});
  }
}

function setPosition(wire, row, col) {
  row &= 0x7;
  col &= 0xf;

  writeCmd(wire, [
    0x20,
    0x02,
    0xb0 | row,
    0x00 | (col << 3 & 0xf),
    0x10 | (col >> 1)
  ]);
}

SSD1308.prototype.enable = function (en) {
  writeCmd(this.wire, [ (en) ? 0xaf : 0xae ]);
};

SSD1308.prototype.setCell = function (row, col, on) {
  var val = (on) ? 0xff : 0x00;
  setPosition(this.wire, row, col);
  writeData(this.wire, [ val, val, val, val, val, val, val, val ]);
};

SSD1308.prototype.setGauge = function (row, val) {
  var data = [];
  for (var i = 0; i < 128; i++) {
    data.push((i < val) ? 0xff : 0x00);
  }
  setPosition(this.wire, row, 0);
  writeData(this.wire, data);
};

SSD1308.prototype.fill = function (on) {
  for (var i = 0; i < 8; i++) {
    this.setGauge(i, (on) ? 128 : 0);
  }
};

module.exports = SSD1308;
