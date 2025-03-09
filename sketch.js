//SERIAL VARIABLES
let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //default data
let prevData = [...data]; //data
let threePointer;

//GRAPHICS VARIABLES
let messages = [];
let message;

no = 100;
particles = [];

//ORIGINAL
r = 28;
w = r * 0.9 * 1.5;
h = r * 0.9;

//FOR SCREEN
sf = 1;
r = 28 * sf;
w = r * 0.9 * 1.5 * sf;
h = r * 0.9 * sf;

ratio = 0.5;

transX = -r * 4;

m = 28;

fire = false;
fireX = 0;
fireY = 0;

let c1;
let c2;

timer = false;
cnt = 0;

pt = 2;

//COLORS
bg = 0;

owb = "#2bd5f6";
owr = "#ea355b";

const colors1 = [
  "#00FFFF", // Cyan
  "#00E5EE", // Light Cyan
  "#00CED1", // Dark Turquoise
  "#20B2AA", // Light Sea Green
  "#48D1CC", // Medium Turquoise
  "#40E0D0", // Turquoise
  "#5F9EA0", // Cadet Blue
  "#8EE5EE", // Pale Turquoise
  "#AFEEEE", // Lighter Cyan
  "#B0E0E6", // Powder Blue
];

const colors2 = [
  "#4169E1", // Royal Blue
  "#4682B4", // Steel Blue
  "#5F9EA0", // Cadet Blue
  "#6495ED", // Cornflower Blue
  "#87CEEB", // Sky Blue
  "#87CEFA", // Light Sky Blue
  "#1E90FF", // Dodger Blue
  "#00BFFF", // Deep Sky Blue
  "#ADD8E6", // Light Blue
  "#B0C4DE", // Light Steel Blue
  "#AFEEEE", // Pale Turquoise
];

const colors3 = [
  "#ea355b", // Main Color (Pink)
  "#ff6383", // Light Pink
  "#d6204a", // Deep Pink
  "#f76e94", // Pastel Pink
  "#b51842", // Dark Magenta
  "#ff8ca4", // Soft Salmon
  "#ff3d68", // Bright Coral Pink
  "#c71c44", // Crimson
  "#ff99b0", // Light Rosy Pink
  "#d10f50", // Vivid Rose
];

const colors4 = [
  "#ff0000", // Main Color (Red)
  "#ff4d4d", // Light Red
  "#e60000", // Deep Red
  "#ff7373", // Salmon Pink
  "#cc0000", // Dark Crimson
  "#ff9999", // Soft Peach Red
  "#ff3333", // Bright Scarlet
  "#b30000", // Burgundy
  "#ffb3b3", // Pale Red
  "#d10000", // Crimson Red
];

players = [
  {
    team: 1,
    number: 6,
    name: "James",
    score: 0,
  },
  {
    team: 1,
    number: 4,
    name: "Curry",
    score: 0,
  },
  {
    team: 1,
    number: 15,
    name: "Booker",
    score: 0,
  },
  {
    team: 1,
    number: 14,
    name: "Davis",
    score: 0,
  },
  {
    team: 1,
    number: 7,
    name: "Durant",
    score: 0,
  },
  {
    team: 2,
    number: 10,
    name: "Fournier",
    score: 0,
  },
  {
    team: 2,
    number: 32,
    name: "Wenban..",
    score: 0,
  },
  {
    team: 2,
    number: 5,
    name: "Batum",
    score: 0,
  },
  {
    team: 2,
    number: 7,
    name: "Yabusele",
    score: 0,
  },
  {
    team: 2,
    number: 12,
    name: "De Colo",
    score: 0,
  },
];

teamScoreA = 0;
teamScoreB = 0;
playersA = players.filter((player) => player.team == 1);
playersB = players.filter((player) => player.team == 2);

transB = 160;

fontSize = 7;

function setup() {
  //ONLY APPLY CSS TO CANVAS
  let canvas = createCanvas(1920 * ratio, 1080 * ratio);
  canvas.id("canvas");
  background(bg);
  rectMode(CENTER);
  angleMode(DEGREES);

  //CREATE GRAPHICS
  g = createGraphics(width / 2, height / 2);
  g.attribute("style", ""); //NO CSS
  g.position(0, 0);
  g.rectMode(CENTER);
  g.textAlign(CENTER, CENTER);
  g.textSize(fontSize);
  g.strokeJoin(ROUND);

  //BUTTTON
  let buttons = selectAll(".player-btn"); // Select all buttons
  
  buttons.forEach((btn, index) => {
    // When button is pressed, set data[index] to 1
    btn.mousePressed(() => {
      data[index] = 1;
      // console.log(data);
    });

    // When button is released, set data[index] to 0
    btn.mouseReleased(() => {
      data[index] = 0;
    });
  });
  
  // particles.push(new Particle(width/2, height/2, c1, c2));
}

function draw() {
  clear();
  
//     for (let particle of particles) {
//       particle.show();
//       particle.update();
//     }
  
  //RESET
  if (prevData[data.length - 2] === 0 && data[data.length - 2] === 1) {
    for (let i = 0; i < players.length; i++) {
      players[i].score = 0;
      messages = [];
    }
  }

  for (let i = 0; i < players.length; i++) {
    if (prevData[i] === 0 && data[i] === 1) {
      if (threePointer === 1) {
        pt = 3;
      } else {
        pt = 2;
      }

      players[i].score += pt;
      score = true;

      fire = true;
      fireY = height - h * 2 - 7;

      if (i < 5) {
        fireX = m + (w / 2) * 1.5 + w * 2 * i;

        c1 = colors1;
        c2 = colors2;
      } else {
        fireX = m + (w / 2) * 1.5 + w * 2 * (i + 2) + 20;

        c1 = colors3;
        c2 = colors4;
      }

      timer = true;
      
      message = `${players[i].name} scored ${pt}!`;
      messages.push(message);
    }

    // prevData[i] = data[i];
  }

  prevData = [...data]; //data

  // console.log(fire, timer, cnt);

  //DRAW EFFECTS
  if (fire) {
    if (cnt < 240) {
      particles.push(new Particle(fireX, fireY, c1, c2));
    }
    
    // particles.push(new Particle(fireX, fireY, c1, c2));

    for (let particle of particles) {
      particle.show();
      particle.update();

      if (particle.finished()) {
        particles.splice(particle, 1);
      }
    }
  }

  //TIMER
  if (timer) {
    cnt++;
  }

  if (cnt > 240) {
    timer = false;
    fire = false;
    cnt = 0;
    particles = [];
  }

  //DRAW UI
  g.clear();

  //DRAW MESSAGES
  if (messages.length > 5) {
    messages.splice(0, messages.length - 5);
  }

  g.push();
  const startY = g.height - 60 - (messages.length - 1) * 12;

  for (let i = 0; i < messages.length; i++) {
    g.textSize(8);
    g.textAlign(LEFT, CENTER);
    g.noStroke();

    if (i === messages.length - 1) {
      opa = 255;
    } else {
      opa = 100;
    }

    g.fill(255, opa);
    g.text(messages[i], 10, startY + i * 12);
  }
  g.pop();

  //DRAW RECTS
  g.push();
  for (let i = 0; i < players.length; i++) {
    let x = i * w;

    transY = g.height - h / 2 - m;

    if (i < 5) {
      transX = m;
      c = owb;
    } else {
      transX = m + 5 * w - (5 * w) / 2 - m / 3;
      c = owr;
    }

    g.stroke(bg, 40);
    g.strokeWeight(2);
    g.fill(c);
    g.rect(transX + x, transY, w, h * 0.5);

    g.fill(255);
    g.stroke(bg, 40);
    g.text(players[i].score, transX + x, transY);

    g.stroke(bg, 40);
    g.strokeWeight(2);
    g.fill(c);
    g.rect(transX + x, transY + r * 0.9 * 0.75, w, h);

    g.fill(255);
    g.stroke(bg, 40);
    g.text(players[i].name, transX + x, transY + h * 0.75 - fontSize / 2);
    g.text(players[i].number, transX + x, transY + h * 0.75 + fontSize * 0.75);
  }
  g.pop();

  //TEAM SCORES
  g.push();
    let teamScoreA = playersA.reduce(
      (accumulator, current) => accumulator + current.score,
      0
    );

    let teamScoreB = playersB.reduce(
      (accumulator, current) => accumulator + current.score,
      0
    );

    g.translate(g.width / 2, g.height - m);

    g.textAlign(CENTER, CENTER);
    g.textSize(24);
    g.fill(255);
    g.text(`${teamScoreA} : ${teamScoreB}`, 0, 0);
  g.pop();

  //threePointer KEY
  if (keyIsDown(51)) {
    //"3"
    threePointer = 1;
  }
}