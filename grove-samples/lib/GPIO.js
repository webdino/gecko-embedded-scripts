var fs = require('fs');

var GPIO = function (pin) {
  var pinnum = {
    A: '36',
    B: '12',
    C: '13',
    D: '69',
    E: '115',
    F: '507', /* XXX: not working? */
    G: '24',
    H: '25',
    I: '35',
    J: '34',
    K: '28',
    L: '33'
  };
  var num = pinnum[pin];

  this.path = '/sys/class/gpio/gpio' + num;

  try {
    fs.statSync(this.path);
  } catch (e) {
    fs.writeFileSync('/sys/class/gpio/export', num);
  }
};

GPIO.prototype.direction = function (dir) {
  fs.writeFileSync(this.path + '/direction', dir);
};

GPIO.prototype.in = function () {
  /* XXX: workaround for 96Boards Sensors Mezzanine issue */
  this.direction('low');

  this.direction('in');
  return (fs.readFileSync(this.path + '/value')[0] == 0x30) ? 0 : 1;
};

GPIO.prototype.out = function (val) {
  this.direction('out');
  fs.writeFileSync(this.path + '/value', val);
};

module.exports = GPIO;
