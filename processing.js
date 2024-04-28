var programCode = function(processingInstance) {
  with (processingInstance) {
    size(400, 395);
    frameRate(30);
    background(255, 255, 255);
    // Code starts here

    class Ball {
  constructor(m, x, y) {
    this.mass = m;
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.color = color(random(255), random(255), random(255), 127);
  }

  applyForce(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }

  calculateWallForce() {
    var xForce = 0;
    var yForce = 0;
    if (this.position.x > width) {
      xForce = -1;
    } else if (this.position.x < 0) {
      xForce = 1;
    }

    if (this.position.y > height) {
      yForce = -1;
    } else if (this.position.y < 0) {
      yForce = 1;
    }
    return new PVector(xForce, yForce);
  }
}

    let balls = [];

    for (let i = 0; i < 20; i++) {
      balls[i] = new Ball(random(0.1, 5), 0, 0);
    }

    let wind = new PVector(0.01, 0);
    let gravity = new PVector(0, 0.1);

    draw = function() {
      background(255, 255, 255);

      for (var i = 0; i < balls.length; i++) {
        balls[i].applyForce(wind);
        balls[i].applyForce(gravity);
        balls[i].applyForce(balls[i].calculateWallForce());
        balls[i].update();
        balls[i].display();
      }
    };

    // Code ends here
  }
};

var canvas = document.getElementById("mycanvas");

var processingInstance = new Processing(canvas, programCode);
