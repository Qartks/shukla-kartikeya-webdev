var stars = []

var speed;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 1000; i++) {
        stars[i] = new Star();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    speed = map(mouseX, 0, width, 10, 10);
    // speed = 2;
    background(0);
    translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
        stars[i].drawLine();
    }
}

function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(height * 2);

    this.update = function() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    this.show = function() {
        fill(255);
        noStroke();

        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);

        var r = map(this.z, 0, width, 12, 0);
        ellipse(sx, sy, r, r);
    }

    this.drawLine = function () {

    }
}