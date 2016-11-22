var PAJ7620 = require('../lib/PAJ7620');
var SSD1308 = require('../lib/SSD1308');
var I2C_BUS = 0;

console.log("Please connect Gesture module to I2C bus " + I2C_BUS + ".");
var gesture = new PAJ7620(I2C_BUS);
console.log("Please connect OLED module to I2C bus " + I2C_BUS + ".");
var oled = new SSD1308(I2C_BUS);

var values = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
var bye = 0;

function getGesture() {
  gesture.getFlag(function (res) {
    values[0] = res[0];
    bye = res[1] & 1;

    gesture.getObject(function (res) {
      values[1] = res[1] << 3 | res[0] >> 5;
      values[2] = res[3] << 3 | res[2] >> 5;
      values[3] = res[4] >> 1;
      values[4] = res[6] << 5 | res[5] >> 3;

      setImmediate(refreshOled);
    });
  });
}

function refreshOled() {
  if (bye) {
    oled.fill(1);
    oled.fill(0);
    oled.enable(0);
    gesture.enable(0);
    return;
  }

  if (values[0]) {
    for (var i = 0; i < 8; i++) {
      oled.setCell(0, i, (values[0] >> i) & 1);
    }
  }

  oled.setGauge(1, values[1]);
  oled.setGauge(2, values[2]);
  oled.setGauge(3, values[3]);
  oled.setGauge(4, values[4]);

  setImmediate(getGesture);
}

oled.enable(1);
oled.fill(1);
oled.fill(0);

gesture.enable(1);

getGesture();
