const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const iterationsSlider = document.getElementById('iterations');
const speedSlider = document.getElementById('speed');
const sawtoothCheck = document.getElementById('sawtooth');
const squareCheck = document.getElementById('square');
const slidersDiv = document.getElementById('sliders');

//origin for circles
var centerX = canvas.width/4;
var centerY = canvas.height/2;

//inital radius value
var radius = canvas.width/10;

//time value to animate
var time = 0;

//the y position of the wave
var wave = [];

//interactive values
iterationsSlider.value = "2"
let iterations = iterationsSlider.value;
let speed = speedSlider.value;
let type = 0;

function init() {
    //sets canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - slidersDiv.clientHeight-10;
    
    centerX = canvas.width/4;
    centerY = canvas.height/2;
    radius = canvas.width/12;
    
    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', init);
init();

//creates new radius, x, and y values for a sawtooth wave
function sawtoothWave(i, px, py){
    //store the vaules into an array
    let stuff = [];
    
    //creates new values
    let r = radius * (2 / (i * Math.PI));
    let x = px + r *  Math.pow(-1, i) * Math.cos(i * time);
    let y = py + r * Math.pow(-1, i) * Math.sin(i * time);
    
    //puts the values into the array
    stuff.push(r);
    stuff.push(x);
    stuff.push(y);
    
    //returns the vaules
    return stuff;
}

//creates new radius, x, and y values for a square wave
function squareWave(i, px, py){
    //store the vaules into an array
    let stuff = [];
    
    //creates new values
    let n = i*2-1;
    let r = radius * (4/ (n * Math.PI));
    let x = px + r * Math.cos(n * time);
    let y = py + r * Math.sin(n * time);
    
    //puts the values into the array
    stuff.push(r);
    stuff.push(x);
    stuff.push(y);
    
    //returns the vaules
    return stuff;
}

function animate(){
    //animates and resets canvas
    requestAnimationFrame(animate);
    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    //updates slider and type values
    iterations = iterationsSlider.value;
    speed = speedSlider.value;
    if(squareCheck.checked)
        type = 0;
    else if(sawtoothCheck.checked)
        type = 1;

    //sets colors to white
    c.strokeStyle = "#fff";
    c.fillStyle = "#fff";
    
    //position of the first circle and origin of the rest
    let x = centerX;
    let y = centerY;

    for(let j = 0; j < iterations; j++){
        let i = j+1;
        //stores the last x and y position
        let px = x;
        let py = y;

        //picks which wave to approximate
        let temp;
        switch(type){
            case 0: temp = squareWave(i, px, py); break;
            case 1: temp = sawtoothWave(i, px, py); break;
        }

        //sets position and radius of the circle
        let r = temp[0];
        x = temp[1];
        y = temp[2];
        
        //draws the circles
        c.strokeStyle = "#fff";
        c.beginPath();
        c.arc(px, py, r, 0, Math.PI*2, false);
        c.moveTo(px, py);
        c.lineTo(x, y);
        c.stroke();
    }

    //adds the next point in the wave to the beginning of the wave array
    wave.unshift(y);

    //draws the line from the last circle to the wave
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(canvas.width/2-1, y);

    //draws the wave
    for(let i = 1; i < wave.length; i++){
        c.lineTo(canvas.width/2 + i, wave[i]);
    }
    c.stroke();

    //keeps the amount of wave points less than the width of the canvas
    if(wave.length > canvas.width)
        wave.pop();

    //speed of wave and rotation of circles
    time -= speed;
}

animate();