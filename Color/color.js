let field = []; // contains the gridpoints
let rez = 25; // resolution value
let cols, rows;
let increment = 0.1; // increment value for noise
let incrementx = 0.1;
let zoff = 0; // time span
let mode; // midpoint method or interpolate method
let noise;
let toggleButton;
let isToggled = false;
let inputField1; // input field for mode
let inputFieldx; // input field for increment
let inputFieldz; // input field for time span
let submitButton1; // button
let submitButton2; // button
let submitButton3; // button

function setup() {
  createCanvas(1800, 1200); // screen size
  noise = new OpenSimplexNoise(Date.now()); // create a noise filter using current datetime as seed
  
  cols = 1 + width / rez; // column size of field
  rows = 1 + height / rez; // row size of field
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k); // initialise of field
  }

  // mode input
  inputField1 = createInput();
  inputField1.position(width/2, 60);
  submitButton1 = createButton('Enter for mode');
  submitButton1.position(width/2 + 50, 90);
  submitButton1.mousePressed(onInputMode);

  // increment input
  inputFieldx = createInput();
  inputFieldx.position(width/2, 120);
  submitButton2 = createButton('Enter for Space Movement');
  submitButton2.position(width/2 + 50, 150);
  submitButton2.mousePressed(onInputX);

  // time span increment
  inputFieldz = createInput();
  inputFieldz.position(width/2, 180);
  submitButton3 = createButton('Enter for Time Span');
  submitButton3.position(width/2 + 50, 210);
  submitButton3.mousePressed(onInputZ);

  toggleButton = createButton('Hide/Show');
  toggleButton.position(950, 20);
  toggleButton.mousePressed(toggleState);
}

function draw() {
  background(0); // white background

  if(isToggled) {
    submitButton1.hide();
    submitButton2.hide();
    submitButton3.hide();
    inputField1.hide();
    inputFieldx.hide();
    inputFieldz.hide();
  }
  else {
    submitButton1.show();
    submitButton2.show();
    submitButton3.show();
    inputField1.show();
    inputFieldx.show();
    inputFieldz.show();
  }

  // increment is used to emulate a moving screen
  let xoff = 0;
  for (let i = 0; i < cols; i++) {
    xoff += increment;
    let yoff = 0;
    for (let j = 0; j < rows; j++) {
      field[i][j] = float(noise.noise3D(xoff, yoff, zoff)); // field is filled with noise values
      yoff += increment;
    }
  }
  zoff += incrementx; // time change

  // run for each square
  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let a = contour(i,j,mode,0);
      let b = contour(i,j,mode,1);
      let c = contour(i,j,mode,2);
      let d = contour(i,j,mode,3);
      
      // to get the binary value of a square
      let state = getState([ceil(field[i][j]),ceil(field[i + 1][j]),ceil(field[i + 1][j + 1]),ceil(field[i][j + 1])]);
      
      stroke(255);
      //colorMode(HSB, 255, 255, 255);
      stroke(255,1);
      strokeWeight(20);
      noFill(); // adds black background (looks good imo)
//      square(x, y, rez);
      strokeWeight(2); // stroke weight of the isolines
      stroke(map(state, 0, 15, 100, 200), map(state, 0, 15, 0, 150), map(state, 0, 15, 200, 255), 255); // multicolor
//    stroke(9,255,255); // mono color

      displayState(state,a,b,c,d);
    }
  }
}

function displayState(state,a,b,c,d) { // to display each state config
      switch (state) {
        case 1:
          edge(c, d);
          break;
        case 2:
          edge(b, c);
          break;
        case 3:
          edge(b, d);
          break;
        case 4:
          edge(a, b);
          break;
        case 5:
          edge(a, d);
          edge(b, c);
          break;
        case 6:
          edge(a, c);
          break;
        case 7:
          edge(a, d);
          break;
        case 8:
          edge(a, d);
          break;
        case 9:
          edge(a, c);
          break;
        case 10:
          edge(a, b);
          edge(c, d);
          break;
        case 11:
          edge(a, b);
          break;
        case 12:
          edge(b, d);
          break;
        case 13:
          edge(b, c);
          break;
        case 14:
          edge(c, d);
          break;
      }
}

function getState(l) { // convert 4 boolean values into decimal number
  let sum = 0;
  for (let i = 0; i < l.length; i++ ) {
    sum += l[i]*(Math.pow(2,l.length-i-1));
  }
  return sum
}

function contour(i,j,d,a) { // to find the edgepoints within squares
  let m_val;
  let n_val;
  let k = createVector();
  let x = i*rez;
  let y = j*rez;
  
  switch(a) {
    case 0: // a
    if(d!=0.5) { // interpolate
      m_val = field[i][j]+1;
      n_val = field[i+1][j] + 1;
      d = diff(m_val,n_val); // linear difference
    }
    k.x = lerp(x, x + rez, d); // distance from leftmost point
      k.y = y;
    break;
    
    case 1: // b
    if(d!=0.5) { // interpolate
      m_val = field[i + 1][j] + 1;
          n_val = field[i + 1][j + 1] + 1;
      d = diff(m_val,n_val);          
      }
    k.x = x + rez;
      k.y = lerp(y, y + rez, d);
    break;
    
    case 2: // c
    if(d!=0.5) { // interpolate
      m_val = field[i + 1][j + 1] + 1;
          n_val = field[i][j + 1] + 1;
      d = diff(n_val,m_val);          
        }
    k.x = lerp(x, x+rez, d);
      k.y = y + rez;
    break;
    
    case 3: // d
    if(d!=0.5) { // interpolate
      m_val = field[i][j] + 1;
      n_val = field[i][j + 1] + 1;
      d = diff(m_val,n_val);      
      }
      k.x = x;
        k.y = lerp(y, y + rez, d);
    break;
    
    default:
    break;
  }
  return k;
}

function diff(a,b) { // linear difference between two points
  return (1 - a) / (b - a);
}

function edge(v1, v2) { // draw line betweem two points
  line(v1.x, v1.y, v2.x, v2.y);
}

function onInputMode() { // input function for mode
  mode = parseFloat(inputField1.value());
}

function onInputX() { // input function for increment
  increment = parseFloat(inputFieldx.value());
}

function onInputZ() { // input function for time span
  incrementx = parseFloat(inputFieldz.value());
}

function toggleState() {
  isToggled = !isToggled;
}