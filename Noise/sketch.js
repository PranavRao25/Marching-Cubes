let field = [];
let rez = 5;
let cols, rows;
let increment = 0.1;
let zoff = 0;
let noise;

function setup() {
  createCanvas(1800, 1200); // screen size
  noise = new OpenSimplexNoise(Date.now());
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k);
  }
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function draw() {
  background(0);
  let xoff = 0;
  for (let i = 0; i < cols; i++) {
    xoff += increment;
    let yoff = 0;
    for (let j = 0; j < rows; j++) {
      field[i][j] = float(noise.noise3D(xoff, yoff, zoff));
      yoff += increment;
    }
  }
  zoff += 0.02;

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let x = i * rez;
      let y = j * rez;

      let state = getState(ceil(field[i][j]),ceil(field[i + 1][j]),ceil(field[i + 1][j + 1]),ceil(field[i][j + 1]));

      let a_val = field[i][j] + 1;
      let b_val = field[i + 1][j] + 1;
      let c_val = field[i + 1][j + 1] + 1;
      let d_val = field[i][j + 1] + 1;

      let a = createVector();
      a.x = lerp(x, x + rez, diff(a_val,b_val));
      //a.x = lerp(x, x + rez, 0.5);
      a.y = y;

      let b = createVector();
      b.x = x + rez;
      b.y = lerp(y, y + rez, diff(b_val,c_val));
      //b.y = lerp(y, y + rez, 0.5);      

      let c = createVector();
      c.x = lerp(x, x + rez, diff(d_val,c_val));
//      c.x = lerp(x, x + rez, 0.5);
      c.y = y + rez;

      let d = createVector();
      d.x = x;
      d.y = lerp(y, y + rez, diff(a_val,d_val));
//      d.y = lerp(y, y + rez, 0.5);

      stroke(255);
      strokeWeight(20);
      noFill(); // adds black background (looks good imo)
      strokeWeight(2); // stroke weight of the isolines
      stroke(map(state, 0, 15, 100, 200), map(state, 0, 15, 0, 150), map(state, 0, 15, 200, 255), 255); // multicolor
            
      switch (state) {
        case 1:
          drawLine(c, d);
          break;
        case 2:
          drawLine(b, c);
          break;
        case 3:
          drawLine(b, d);
          break;
        case 4:
          drawLine(a, b);
          break;
        case 5:
          drawLine(a, d);
          drawLine(b, c);
          break;
        case 6:
          drawLine(a, c);
          break;
        case 7:
          drawLine(a, d);
          break;
        case 8:
          drawLine(a, d);
          break;
        case 9:
          drawLine(a, c);
          break;
        case 10:
          drawLine(a, b);
          drawLine(c, d);
          break;
        case 11:
          drawLine(a, b);
          break;
        case 12:
          drawLine(b, d);
          break;
        case 13:
          drawLine(b, c);
          break;
        case 14:
          drawLine(c, d);
          break;
      }
    }
  }
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

function diff(a,b) {
	return (1 - a) / (b - a);
}
