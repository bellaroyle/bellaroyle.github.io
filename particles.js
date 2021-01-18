let canvas = null;
let adjustX = 140;
let adjustY = 200;
let particleArray = [];

const mouse = {
  x: null,
  y: null,
  radius: 120,
};
// if the screen in landscape the canvas  has id canvas1, if it is portrait, it has id canvas2
if (document.getElementById('canvas1')) {
  // Set different canvas sizes so that it can be responsive to different screens.
  // I am working on making the canvas linearly responsive, however currently if i do that the mouse hover will be in the wrong position
  // adjustX and adjustY position the particles in the canvas
  if (window.innerWidth > 1200) {
    canvas = document.getElementById('canvas1');
    canvas.width = 1200;
    canvas.height = 600;
    adjustX = 295;
    adjustY = 180;

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x - (window.innerWidth - canvas.offsetWidth) / 2;
      mouse.y = event.y - (window.innerHeight - canvas.offsetHeight) / 2;
    });
  } else {
    canvas = document.getElementById('canvas1');
    canvas.width = 800;
    canvas.height = 600;
    adjustX = 165;
    adjustY = 200;

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x - (window.innerWidth - canvas.offsetWidth) / 2;
      mouse.y = event.y - (window.innerHeight - canvas.offsetHeight) / 2;
    });
  }
} else {
  canvas = document.getElementById('canvas2');

  if (window.innerWidth > 600) {
    canvas.width = 600;
    canvas.height = 900;
    adjustX = 110;
    adjustY = 185;
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x - (window.innerWidth - canvas.offsetWidth) / 2;
      mouse.y = event.y - (window.innerHeight - canvas.offsetHeight) / 2;
    });
  } else {
    canvas.width = 300;
    canvas.height = 450;
    adjustX = 15;
    adjustY = 40;
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x - (window.innerWidth - canvas.offsetWidth) / 2;
      mouse.y = event.y - (window.innerHeight - canvas.offsetHeight) / 2;
    });
  }
}

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
let textCoordinates = [];
// const markerFont = new FontFace('Lucida Console', 'url(https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap)')
// markerFont.load().then((loadedFace) => {
//     document.fonts.add(loadedFace)
// }).catch(err => {
//     console.dir(err)
// })

if (document.getElementById('canvas1')) {
  if (window.innerWidth > 1200) {
    // creates text and stores the coordinates of it in an array
    ctx.font = 'italic 120px American Typewriter';
    ctx.fillText('Bella Royle', 0, 90);
    textCoordinates = ctx.getImageData(0, 0, 1000, 150);
  } else {
    ctx.font = 'italic 90px American Typewriter';
    ctx.fillText('Bella Royle', 0, 70);
    textCoordinates = ctx.getImageData(0, 0, 1000, 150);
  }
} else {
  if (window.innerWidth > 600) {
    ctx.font = 'italic 120px American Typewriter';
    ctx.fillText(' Bella ', 0, 95);
    ctx.fillText(' Royle ', 0, 245);
    textCoordinates = ctx.getImageData(0, 0, 1000, 300);
  } else {
    ctx.font = 'italic 90px American Typewriter';
    ctx.fillText(' Bella ', 0, 70);
    ctx.fillText(' Royle ', 0, 155);
    textCoordinates = ctx.getImageData(0, 0, 1000, 300);
  }
}

class Particle {
  // creates particles for given x and y coordinates
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 50 + 5;
  }
  draw() {
    // makes particles solid circles
    ctx.fillStyle = '#86ffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    // makes the particles move if within mouse.radius
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let force = ((mouse.radius - distance) * 2) / mouse.radius;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

const init = () => {
  // creates particles for the text
  particleArray = [];
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let X = x + adjustX;
        let Y = y + adjustY;
        particleArray.push(new Particle(X, Y));
      }
    }
  }
};
init();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particleArray) {
    particle.draw();
    particle.update();
  }
  requestAnimationFrame(animate);
};
animate();
