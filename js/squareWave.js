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

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.strokeStyle = "#fff";
    c.fillStyle = "#fff";
    
    let x = centerX;
    let y = centerY;

    for(let i = 1; i < 1000; i++){
        let px = x;
        let py = y;
        
        let n = i*2-1;
        let r = radius * (4/ (n * Math.PI));

        x = px + r * Math.cos(n * time);
        y = py + r * Math.sin(n * time);
        
        c.strokeStyle = "#fff";
        c.beginPath();
        c.arc(px, py, r, 0, Math.PI*2, false);
        c.moveTo(px, py);
        c.lineTo(x, y);
        c.stroke();
    }

    wave.unshift(y);

    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(canvas.width/2, y);
    for(let i = 1; i < wave.length; i++){
        c.lineTo(canvas.width/2+1 + i, wave[i]);
    }
    c.stroke();

    if(wave.length > canvas.width)
        wave.pop();

    time += .025;
}

animate();