(function () {

})();

var stars = [];
var canvas;
var speed = 8;
var elt;
var t = 0.0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    for (var i = 0; i < 1000; i++) {
        stars[i] = new Star();
    }
    elt = document.getElementById("gargoyle");
    elt.addEventListener("mouseover", showHello);
    elt.addEventListener("mouseout", showGoodbye);
}


function showHello() {
    speed = 40;
}

function showGoodbye() {
    speed = 8;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // speed = map(mouseX, 0, width, 15, 15);
    // speed = 2;
    background(0);
    translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }

}

function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(height * 2);
    this.easing = random(.01,.2);

    //start with a random speed for both X and Y
    this.speedY = random(1,5);
    this.speedX = random (1,5);

    // random direction;
    this.ranX = random(2);
    this.ranY = random(2);

    if(this.ranX < 1){
        this.dirX = -1;
    }
    else{
        this.dirX = 1;
    }
    if(this.ranY < 1){
        this.dirY = -1;
    }
    else{
        this.dirY = 1;
    }

    this.update = update1;

    function update1() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    function update2() {
        this.px += this.speedX * this.dirX;
        this.py += this.speedY * this.dirY;
        this.x += (this.x - this.px) * this.easing;
        this.y += (this.y - this.py) * this.easing;
        // t = t + 0.01;
    }

    this.show = function() {
        fill(255);
        noStroke();

        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);

        var r = map(this.z, 0, width, 12, 0);
        ellipse(sx, sy, r, r);
    }
}