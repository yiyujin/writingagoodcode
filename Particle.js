class Particle {
  constructor(x, y, colors1, colors2) {
    this.x = x;
    this.y = y;
    this.pos = createVector(this.x, this.y);
    this.pos2 = createVector(this.x, this.y);

    this.r = w;
    this.ratio = random(0.1, 0.8);

    this.vel = createVector(random(-1, 1), random(-5, -1));

    this.colors1 = colors1;
    this.colors2 = colors2;

    this.c = color(random(this.colors1));

    this.opa = 255;
    this.amt = 10; //amount of fade out

    this.c2 = color(random(this.colors2));
    this.opa2 = 255;
  }

  update() {
    this.pos.add(this.vel);
    this.opa -= this.amt;
  }

  finished() {
    return this.opa < 0;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);

    scale(2); //due to attribute side effect

    this.c.setAlpha(this.opa);
    fill(this.c);
    noStroke();
    ellipse(0, 0, this.r * this.ratio, this.r);

    let motion = sin(this.pos.x * 10 + frameCount) * r * 1.5;
    let rectX = map(motion, -100, 100, -r / 4, r / 4);
    let rectY = map(motion, -100, 100, -r / 4, r);
    this.c2.setAlpha(motion);
    fill(this.c2);
    // fill(this.opa);
    rect(rectX, rectY, this.r * 0.4, this.r);

    stroke(this.c2);
    strokeWeight(4);
    line(0, 0, 0, r);
    pop();

    //RECT OUTLINE
    push();
    translate(this.pos2.x, this.pos2.y);

    scale(2);

    stroke(this.c2);
    strokeWeight(4);
    noFill();
    // rect(0, 0, r);
    rect(0, 0, w, h * 1.5);
    pop();
  }
}