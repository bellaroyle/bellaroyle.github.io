let canvas = null
const markerFont = new FontFace('Permanent Marker', 'url(https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap)')
markerFont.load().then((loadedFace) => { document.fonts.add(loadedFace) }).catch()
let adjustX = 140
let adjustY = 200
let particleArray = []

const mouse = {
    x: null,
    y: null,
    radius: 100
}

if (document.getElementById('canvas1')) {
    if (window.innerWidth > 1200) {
        canvas = document.getElementById('canvas1');
        canvas.width = 1200;
        canvas.height = 900;
        adjustX = 210
        adjustY = 340

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x - ((window.innerWidth - canvas.offsetWidth) / 2)
            mouse.y = event.y - ((window.innerHeight - canvas.offsetHeight) / 2);
        })
    } else {
        canvas = document.getElementById('canvas1');
        canvas.width = 800;
        canvas.height = 600;
        adjustX = 120
        adjustY = 200

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x - ((window.innerWidth - canvas.offsetWidth) / 2)
            mouse.y = event.y - ((window.innerHeight - canvas.offsetHeight) / 2);
        })
    }
}
else {
    canvas = document.getElementById('canvas2');

    if (window.innerWidth > 600) {
        canvas.width = 600;
        canvas.height = 900;
        adjustX = 80
        adjustY = 200
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x - ((window.innerWidth - canvas.offsetWidth) / 2)
            mouse.y = event.y - ((window.innerHeight - canvas.offsetHeight) / 2);
        })
    } else {
        canvas.width = 400;
        canvas.height = 600;
        adjustX = 40
        adjustY = 130
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x - ((window.innerWidth - canvas.offsetWidth) / 2)
            mouse.y = event.y - ((window.innerHeight - canvas.offsetHeight) / 2);
        })
    }

}


const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
let textCoordinates = []
if (document.getElementById('canvas1')) {
    if (window.innerWidth > 1200) {
        ctx.font = "120px Permanent Marker"
        ctx.fillText('Bella  Royle', 0, 90)
        textCoordinates = ctx.getImageData(0, 0, 1000, 150);
    }
    else {
        ctx.font = "90px Permanent Marker"
        ctx.fillText('Bella  Royle', 0, 70)
        textCoordinates = ctx.getImageData(0, 0, 1000, 150);
    }

} else {
    if (window.innerWidth > 600) {
        ctx.font = "120px Permanent Marker"
        ctx.fillText(' Bella ', 0, 95)
        ctx.fillText(' Royle ', 0, 245)
        textCoordinates = ctx.getImageData(0, 0, 1000, 300);
    } else {
        ctx.font = "90px Permanent Marker"
        ctx.fillText(' Bella ', 0, 70)
        ctx.fillText(' Royle ', 0, 195)
        textCoordinates = ctx.getImageData(0, 0, 1000, 300);
    }
}


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5
    }
    draw() {
        ctx.fillStyle = '#86ffff';
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


const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let particle of particleArray) {
        particle.draw();
        particle.update();
    }
    requestAnimationFrame(animate)
}
animate()