/**
 * Created by qartks on 11/10/16.
 */

var particles = [];
var reached   = [];
var xoff      = 0.0;
var rad       = 3;
var myCanvas;

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("#particle-system");
    myCanvas.style("z-index", "-2");

    for (var i = 0; i < 50; i++) {
        var posx = random(0, width);
        var posy = random(0, height);
        var vel = createVector(random(-0.5,0.5), random(-0.5,0.5));
        var acc = createVector(random(-0.5,0.5), random(-0.5,0.5));
        particles.push(new Particle(posx, posy, vel, acc, rad));
    }

    var mouseParticle = new Particle(mouseX, mouseY, 0, 0, 0);
    particles.push(mouseParticle);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // background(5, 39, 79);
    background(0);

    for (var i = 0; i < particles.length; i++) {
        for (var j = 0; j < particles.length; j++) {
            particles[j].link(particles[i]);
        }
        particles[i].update();
        particles[i].display();
    }
}

function Particle(posx, posy, vel, acc, rad) {
    this.pos = createVector(posx, posy);
    this.vel = p5.Vector.random2D();
    this.acc = acc;
    this.rad = rad;
}

function mousePressed() {
    var vel = createVector(random(-0.5,0.5), random(-0.5,0.5));
    var acc = createVector(random(-0.5,0.5), random(-0.5,0.5));
    particles.push(new Particle(mouseX, mouseY, vel, acc, rad))
}

Particle.prototype.update = function() {
    this.acc = createVector(random(-.1,.1), 0);
    this.vel.add(this.acc);
    this.vel.normalize();
    this.pos.add(this.vel);

    if (this.pos.x > width)     this.pos.x = 0;
    if (this.pos.x < 0)         this.pos.x = width;
    if (this.pos.y > height)    this.pos.y = 0;
    if (this.pos.y < 0)         this.pos.y = height;

    if (this.rad === 0) {
        this.pos.x = mouseX;
        this.pos.y = mouseY;
    }
}

Particle.prototype.display = function() {
    fill(85);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
}

Particle.prototype.link = function(p) {
    p1 = this;
    p2 = p;
    var dis = int(dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y));

    if (dis < 100) {
        stroke(255, 100);
        strokeWeight(.4);
        line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
    }
}
