const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

var centerX = canvas.width/4;
var centerY = canvas.height/2;
var radius = canvas.width/10;
var time = 0;
var wave = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    centerX = canvas.width/4;
    centerY = canvas.height/2;
    radius = canvas.width/12;

    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', init);
init();

function sawtooth(i, px, py){
    let stuff = [];
    let r = radius * (2 / (i * Math.PI));
    let x = px + r *  Math.pow(-1, i) * Math.cos(i * time);
    let y = py + r * Math.pow(-1, i) * Math.sin(i * time);

    stuff.push(r);
    stuff.push(x);
    stuff.push(y);

    return stuff;
}

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.strokeStyle = "#fff";
    c.fillStyle = "#fff";
    
    //position of the first circle and origin of the rest
    let x = centerX;
    let y = centerY;

    for(let i = 1; i < 1000; i++){
        //stores the last x and y position
        let px = x;
        let py = y;
        
        //sets position and radius of the circle
        let temp = sawtooth(i, px, py);
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
    c.lineTo(canvas.width/2, y);

    //draws the wave
    for(let i = 1; i < wave.length; i++){
        c.lineTo(canvas.width/2+1 + i, wave[i]);
    }
    c.stroke();

    //keeps the amount of wave points less than the width of the canvas
    if(wave.length > canvas.width)
        wave.pop();

    time -= .025;
}

animate();