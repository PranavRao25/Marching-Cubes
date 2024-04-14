let field = []; // contains the gridpoints
let rez = 25; // resolution value
let cols, rows;
let increment = 0.2; // increment value for noise
let zoff = 0;
let noise;

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
}

function edge(v1, v2) { // draw line betweem two points
  line(v1.x, v1.y, v2.x, v2.y);
}

function draw() {
  background(0); // white background
  
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
  zoff += 0.02; // time change

  // run for each square
  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      // midpoint method
      //let a = contour(i,j,0.5,0);
      //let b = contour(i,j,0.5,1);
      //let c = contour(i,j,0.5,2);
      //let d = contour(i,j,0.5,3);
      
      // interpolate method
      let a = contour(i,j,1,0);
      let b = contour(i,j,1,1);
      let c = contour(i,j,1,2);
      let d = contour(i,j,1,3);
           
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
// 	  stroke(9,255,255); // mono color

      switch (state) { // get the case for each state
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
