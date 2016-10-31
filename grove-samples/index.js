var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// GPIO

var GPIO = require('./lib/GPIO');
var gpio = {};
[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' ].forEach(function (pin) {
  gpio[pin] = new GPIO(pin);
});

app.get('/gpio/:pin', function (req, res) {
  res.json({ value: gpio[req.params.pin].in() });
});

app.put('/gpio/:pin', function (req, res) {
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    var pin = JSON.parse(body);
    gpio[req.params.pin].out(pin.value);
    res.sendStatus(204);
  });
});

// Gesture

var PAJ7620 = require('./lib/PAJ7620');
var gesture = new PAJ7620(0);
gesture.enable(1);
var flag = 0;
setInterval(function () {
  gesture.getFlag(function (res) {
    flag |= (res[1] & 1) << 8 | res[0];
  });
}, 100);

app.get('/gesture', function (req, res) {
  req.setTimeout(Number.MAX_VALUE);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  var timer = setInterval(function () {
    if (flag) {
      res.write('data: ' + JSON.stringify({ flag: flag }) + '\n\n');
    }
    flag = 0;
  }, 100);

  req.on('close', function () {
    clearInterval(timer);
  });
});

// OLED

var SSD1308 = require('./lib/SSD1308');
var oled = new SSD1308(0);
oled.fill(0);
oled.enable(1);

app.put('/gauge/:row', function (req, res) {
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    var gauge = JSON.parse(body);
    oled.setGauge(req.params.row, gauge.value);
    res.sendStatus(204);
  });
});

app.listen(3000);
