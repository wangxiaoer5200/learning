var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var R;
var MAEGIN_TOP;
var MAEGIN_LEFT;
var time;
var year = new Date().getFullYear();
var month = new Date().getMonth();
var day = new Date().getDate();
const nowDate = new Date(year, month, day, 0, 0, 0);
var curShowTimeSeconds = 0;

var balls = [];
const colors = [
  '#409EFF',
  '#67C23A',
  '#E4E7ED',
  '#E6A23C',
  '#909399',
  '#909399',
  '#F56C6C'
];

window.onload = () => {
  Init();
};

window.onresize = () => {
  clearInterval(time);
  Init();
};

function Init() {
  WINDOW_WIDTH = document.body.clientWidth;
  WINDOW_HEIGHT = document.body.clientHeight;
  MAEGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  R = Math.round((WINDOW_WIDTH * 4) / 5 / 108) - 1;
  MAEGIN_TOP = Math.round(WINDOW_HEIGHT / 10);

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
  curShowTimeSeconds = getCurShowTimeSeconds();
  time = setInterval(() => {
    render(context);
    update();
  }, 50);
}

function update() {
  var nextShowTimeseconds = getCurShowTimeSeconds();

  var h = parseInt(curShowTimeSeconds / 3600);
  var m = parseInt((curShowTimeSeconds - h * 3600) / 60);
  var s = curShowTimeSeconds % 60;

  var hs = parseInt(nextShowTimeseconds / 3600);
  var ms = parseInt((nextShowTimeseconds - h * 3600) / 60);
  var ss = nextShowTimeseconds % 60;

  if (s != ss) {
    if (parseInt(h / 10) != parseInt(hs / 10)) {
      Addball(MAEGIN_TOP, MAEGIN_LEFT, parseInt(hs / 10));
    }
    if (parseInt(h % 10) != parseInt(hs % 10)) {
      Addball(MAEGIN_TOP, MAEGIN_LEFT + 15 * (R + 1), parseInt(hs % 10));
    }
    if (parseInt(m / 10) != parseInt(ms / 10)) {
      Addball(MAEGIN_TOP, MAEGIN_LEFT + 39 * (R + 1), parseInt(ms / 10));
    }
    if (parseInt(m % 10) != parseInt(ms % 10)) {
      Addball(MAEGIN_TOP, MAEGIN_LEFT + 54 * (R + 1), parseInt(hs % 10));
    }
    if (parseInt(s / 10) != parseInt(ss / 10)) {
      Addball(MAEGIN_TOP, MAEGIN_LEFT + 78 * (R + 1), parseInt(ss / 10));
    }
    if (parseInt(s % 10) != parseInt(ss % 10)) {
      Addball(MAEGIN_TOP, MAEGIN_LEFT + 93 * (R + 1), parseInt(ss % 10));
    }
    curShowTimeSeconds = nextShowTimeseconds;
  }
  updateBalls();
}

function Addball(top, left, content) {
  for (let i = 0; i < data[content].length; i++) {
    for (let j = 0; j < data[content][i].length; j++) {
      if (data[content][i][j] == 1) {
        let nums = Math.floor(Math.random() * 4);
        balls.push({
          x: left + 2 * j * (R + 1) + (R + 1),
          y: top + 2 * i * (R + 1) + (R + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, nums) * 4,
          vy: nums * -4,
          colors: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }
  }
}

function updateBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;
    if (balls[i].y >= WINDOW_HEIGHT - R) {
      balls[i].y = WINDOW_HEIGHT - R;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }
  let cur = 0;
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].x + R > 0 && balls[i].x - R < WINDOW_WIDTH) {
      balls[cur++] = balls[i];
    }
  }

  while (balls.length > cur) {
    balls.pop();
  }
}

function getCurShowTimeSeconds() {
  var curTime = new Date();
  var ret = curTime.getTime()-nowDate.getTime();
  ret = Math.round(ret / 1000);
  return ret >= 0 ? ret : 0;
}

function render(context) {
  context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  var h = parseInt(curShowTimeSeconds / 3600);
  var m = parseInt((curShowTimeSeconds - h * 3600) / 60);
  var s = curShowTimeSeconds % 60;
  renderDight(MAEGIN_LEFT, MAEGIN_TOP, parseInt(h / 10), context);
  renderDight(
    MAEGIN_LEFT + 15 * (R + 1),
    MAEGIN_TOP,
    parseInt(h % 10),
    context
  );
  renderDight(MAEGIN_LEFT + 27 * (R + 1), MAEGIN_TOP, 10, context);
  renderDight(
    MAEGIN_LEFT + 39 * (R + 1),
    MAEGIN_TOP,
    parseInt(m / 10),
    context
  );
  renderDight(
    MAEGIN_LEFT + 54 * (R + 1),
    MAEGIN_TOP,
    parseInt(m % 10),
    context
  );
  renderDight(MAEGIN_LEFT + 67 * (R + 1), MAEGIN_TOP, 10, context);
  renderDight(
    MAEGIN_LEFT + 78 * (R + 1),
    MAEGIN_TOP,
    parseInt(s / 10),
    context
  );
  renderDight(
    MAEGIN_LEFT + 93 * (R + 1),
    MAEGIN_TOP,
    parseInt(s % 10),
    context
  );

  for (let s = 0; s < balls.length; s++) {
    context.fillStyle = balls[s].colors;
    context.beginPath();
    context.arc(balls[s].x, balls[s].y, R, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
}

function renderDight(x, y, num, cxt) {
  cxt.fillStyle = 'rgb(0,102,153)';
  for (let i = 0; i < data[num].length; i++) {
    for (let j = 0; j < data[num][i].length; j++) {
      if (data[num][i][j] == 1) {
        cxt.beginPath();
        cxt.arc(
          x + j * 2 * (R + 1) + (R + 1),
          y + i * 2 * (R + 1) + (R + 1),
          R,
          0,
          2 * Math.PI
        );
        cxt.closePath();
        cxt.fill();
      }
    }
  }
}
