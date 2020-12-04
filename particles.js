const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
if (window.innerWidth > 600) {
    canvas.width = 600; //window.innerWidth;
    canvas.height = 600; //window.innerHeight;
}
else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
console.log(canvas.width)

let particleArray = []


const markerFont = new FontFace('Permanent Marker', 'url(https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap)')
markerFont.load().then((loadedFace) => { document.fonts.add(loadedFace) }).catch()
// console.log(canvas.width, canvas.height)
console.log(window.innerWidth, window.innerHeight)
console.log(window.screen.availWidth, window.screen.availHeight)
console.log(window.screen.width, window.screen.height)
console.log((window.innerWidth - 600) / 2)
// alter these for positioning 
let adjustX = 120
let adjustY = 150

// console.log(ctx)


// handle mouse 
const mouse = {
    x: null,
    y: null,
    radius: 100
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x - (window.innerWidth - 600) / 2;
    mouse.y = event.y - (window.innerHeight - 600) / 2;
    // mouse.radius = 150;
    // console.log(mouse.x, mouse.y)
})


ctx.fillStyle = 'white';
ctx.font = "60px Permanent Marker"
// ctx.textAlign = "center";
ctx.fillText('Bella  Royle', 0, 60)
const textCoordinates = ctx.getImageData(0, 0, 1000, 150);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5
    }
    draw() {
        ctx.fillStyle = '#703cff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fill()
    }
    update() {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

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
    // console.log(textCoordinates.height, textCoordinates.width)
    particleArray = []
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let X = x + adjustX;
                let Y = y + adjustY;
                particleArray.push(new Particle(X, Y))
            }
        }
    }
}
init()
// console.log(particleArray.length)

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let particle of particleArray) {
        particle.draw();
        particle.update();
    }
    requestAnimationFrame(animate)
}
animate()