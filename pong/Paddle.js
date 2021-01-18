class Paddle {
  constructor(x) {
    this.x = x;
    this.y = height / 2;
    this.height = 80;
    this.width = 20;

    this.isUp = false;
    this.isDown = false;
  }

  update() {
    if (this.isUp) {
      this.up();
    } else if (this.isDown) {
      this.down();
    }
  }

  display() {
    fill('#86ffff');
    rect(this.x, this.y, 20, 80);
  }

  up() {
    if (this.y > 0) {
      this.y -= 4;
    }
  }

  down() {
    if (this.y < height - this.height) {
      this.y += 4;
    }
  }
}
