let field = []; // contains the gridpoints
let rez = 10; // resolution value
let cols, rows;
let img;
let mode = 0;
let inputField1; // input field for mode
let submitButton1; // button

function setup() {
  createCanvas(1920, 1800);

  cols = width / rez; // column size of field
  rows = height / rez; // row size of field
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k); // initialise of field
  }

  inputField1 = createInput();
  inputField1.position(width/2, 60);
  submitButton1 = createButton('Enter mode for Image');
  submitButton1.position(width/2 + 10, 90);
  submitButton1.mousePressed(onInputMode);
}
  
function draw() {
  // preload();
  if(img){
    image(img, 0, 0); // Draw the image.
    
    loadPixels(); // get pixel array of the image
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * rez;
        let y = j * rez;
        
        // get color value for the pixel
        let c = color(pixels[(x+y*width) * 4],pixels[(x+y*width) * 4 + 1],pixels[(x+y*width) * 4 + 2]);
        // get brightness value from color
        let b = brightness(c);
        field[i][j] = b; // get values from 0 to 255 (or gray scale values)
        fill(255-b);
        
        noStroke(); // disable drawing outline
        rect(x, y, rez, rez);
      }
    }
    
    // display each square
    for (let i = 0; i < cols-1; i++) {
      for (let j = 0; j < rows-1; j++) {
        // get edgepoints
        let a = contour(i,j,0);
        let b = contour(i,j,1);
        let c = contour(i,j,2);
        let d = contour(i,j,3);

        let isovalue = 50; // used to convert field into boolean

        // boolean value decided on whether a gridpoint exceeded the isovalue or not
        let c1 = field[i][j] < isovalue ? 0 : 1;
        let c2 = field[i+1][j] < isovalue ? 0 : 1;
        let c3 = field[i+1][j+1]  < isovalue ? 0 : 1;
        let c4 = field[i][j+1] < isovalue ? 0 : 1;
        let state = getState([c1, c2, c3, c4]);

        stroke(255);
        strokeWeight(4);
        displayState(state,a,b,c,d);
        
        noLoop();
      }
    }
  } else { // Display a message if the image is not loaded
    fill(255, 0, 0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Image not loaded",width/2,height/2);
  }
}

function contour(i,j,a) { // to find the edgepoints within squares
  let m_val;
  let n_val;
  let k = createVector();
  let x = i*rez;
  let y = j*rez;
  
  switch(a) {
      case 0: // a
      m_val = field[i][j]+1;
      n_val = field[i+1][j] + 1;
      //d = diff(m_val,n_val); // linear difference
      d = 0.5;
      k.x = lerp(x, x + rez, d); // distance from leftmost point
      k.y = y;
      break;
      
      case 1: // b
      m_val = field[i + 1][j] + 1;
      n_val = field[i + 1][j + 1] + 1;
      //d = diff(m_val,n_val);
      d = 0.5;
      k.x = x + rez;
      k.y = lerp(y, y + rez, d);
      break;
      
      case 2: // c
      m_val = field[i + 1][j + 1] + 1;
      n_val = field[i][j + 1] + 1;
      //d = diff(n_val,m_val);
      d = 0.5;
      k.x = lerp(x, x+rez, d);
      k.y = y + rez;
      break;
      
      case 3: // d
      m_val = field[i][j] + 1;
      n_val = field[i][j + 1] + 1;
      //d = diff(m_val,n_val);          
      d = 0.5;
      k.x = x;
      k.y = lerp(y, y + rez, d);
      break;
      
      default:
      break;
  }
  return k;
}

function displayState(state,a,b,c,d) {
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

function edge(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function getState(l) {
  let sum = 0;
  for (let i = 0; i < l.length; i++ ) {
    sum += l[i]*(Math.pow(2,l.length-i-1));
  }
  return sum;
}

function handleFile(file) {
  // Load the image
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      // Resize the image to fit the canvas
      img.resize(width, height);
    });
  }
  else {
    console.log('Load Image');
  }
}

function diff(a,b) { // linear difference between two points
    return (1 - a) / (b - a);
}

function onInputMode() {
  mode = parseInt(inputField1.value());
  switch(mode) {
    case 0:
    img = loadImage('input/spider.jpg', imageLoaded, loadImageError);
    break;

    case 1:
    img = loadImage('input/army.jpg', imageLoaded, loadImageError);
    break;

    case 2:
    img = loadImage('input/circle.jpg', imageLoaded, loadImageError);
    break;

    case 3:
    img = loadImage('input/linus.jpg', imageLoaded, loadImageError);
    break;

    default:
    break;
   }
}

function imageLoaded(loadedImage) {
  // Resize the image to fit the canvas
  img = loadedImage;
  img.resize(width/2, height/4);
  image(img,0,0);
  draw();
}

function loadImageError(err) {
  console.error('Error loading image:', err);
}
