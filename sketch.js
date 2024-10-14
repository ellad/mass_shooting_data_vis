let uk, canada, germany, france, russia, us;

let click_count = 0;
let percent_Us_incidents = 410 / 425 * 100;
let percent_UK_incidents = 1 / 425 * 100;
let percent_Canada_incidents = 2 / 425 * 100;
let percent_Germany_incidents = 3 / 425 * 100;
let percent_France_incidents = 4 / 425 * 100;
let percent_Russia_incidents = 5 / 425 * 100;

let percent_Us_deaths = 410 / 584 * 100;
let percent_UK_deaths = 0 / 584 * 100;
let percent_Canada_deaths = 2 / 584 * 100;
let percent_Germany_deaths = 7 / 584 * 100;
let percent_France_deaths = 7 / 584 * 100;
let percent_Russia_deaths = 158 / 584 * 100;

let uk_width = 20;
let uk_height = uk_width * (2/3);
let canada_width = uk_width * 2;
let canada_height = canada_width * (2/3);
let germany_width = canada_width * 1.5;
let germany_height = germany_width * (2/3);
let france_width = germany_width * 1.3;
let france_height = france_width * (2/3);
let russia_width = france_width * 1.7;
let russia_height = russia_width * (2/3);
let us_width = innerWidth;
let us_height = innerHeight;

let uk_flag;
let canada_flag;
let germany_flag;
let france_flag;
let russia_flag;
let us_flag;
let skull;
let info;
let time;
let country_array = [];

function preload() {
  uk_flag = loadImage('assets/UK_flag.png');
  canada_flag = loadImage('assets/canada_flag.png');
  germany_flag = loadImage('assets/Germany_flag.png');
  france_flag = loadImage('assets/France_flag.png');
  russia_flag = loadImage('assets/russia_flag.png');
  us_flag = loadImage('assets/us_flag.png');
  skull = loadImage('assets/skull.png');
  info = loadImage('assets/info_slide.png');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  uk = new Country(0, width / 2, height / 2, uk_width, uk_height, '#FFEAEB', 0, 0, uk_flag);
  country_array.push(uk);
  canada = new Country(2, width / 2, height / 2, canada_width, canada_height, '#FFADB0', uk.width, 0, canada_flag);
  country_array.push(canada);
  germany = new Country(7, width / 2, height / 2, germany_width, germany_height, '#FF999C', uk.width + canada.width, 0, germany_flag);
  country_array.push(germany);
  france = new Country(7, width / 2, height / 2, france_width, france_height, '#FF8488', uk.width + canada.width + germany.width, 0, france_flag);
  country_array.push(france);
  russia = new Country(158, width / 2, height / 2, russia_width, russia_height, '#FF474D', uk.width + canada.width + germany.width + france.width, 0, russia_flag);
  country_array.push(russia);
  us = new Country(410, width / 2, height / 2, us_width, us_height, '#800404', uk.width + canada.width + germany.width + france.width + russia.width, 0, us_flag);
  country_array.push(us);
  time = millis() + 100;

}

function draw() {
  background(0);

  for (let country of country_array) {
    if (country.show) {
      country.display();
      if (country.state === 'dropBodies') {
        country.dropBodies(country.num_deaths);
        if (country.allBodiesDropped()) {
          country.state = 'move';
        }
      } else if (country.state === 'move') {
        if (country.animate_country_moving()) {
          country.show = false;
        }
      }
    }
  }


  if (click_count == 7) {
      image(info, 0, 0, innerWidth, innerHeight);
  }
}


function mousePressed() {
  click_count++;
  console.log('Click count:', click_count);
  if (click_count == 1) {
    uk.show = true;
    uk.state = 'dropBodies';
  } else if (click_count == 2) {
    canada.show = true;
    canada.state = 'dropBodies';
  } else if (click_count == 3) {
    germany.show = true;
    germany.state = 'dropBodies';
  } else if (click_count == 4) {
    france.show = true;
    france.state = 'dropBodies';
  } else if (click_count == 5) {
    russia.show = true;
    russia.state = 'dropBodies';
  } else if (click_count == 6) {
    us.show = true;
    us.state = 'dropBodies';
  }
  else if(click_count == 7) {
      image(info, 0, 0, innerWidth, innerHeight);
  }
   else {
    background(0);
    click_count = 0;
    for (let country of country_array) {
      country.show = false;
      country.state = 'display';
      country.resetBodyPositions();
    }
  }
}

function mouseMoved() {
  if (click_count == 0) {
    cursor(HAND);
  } else if (click_count == 1 && mouseX > uk.x_pos && mouseX < uk.width + uk.x_pos && mouseY > uk.y_pos && mouseY < uk.y_pos + uk.height) {
    cursor(HAND);
  }
  else if (click_count == 2 && mouseX > canada.x_pos && mouseX < canada.width + canada.x_pos && mouseY > canada.y_pos && mouseY < canada.y_pos + canada.height) {
    cursor(HAND);
  }
  else if(click_count == 3 && mouseX > germany.x_pos && mouseX < germany.width + germany.x_pos && mouseY > germany.y_pos && mouseY < germany.y_pos + germany.height) {
    cursor(HAND);
  }
  else if(click_count == 4 && mouseX > france.x_pos && mouseX < france.width + france.x_pos && mouseY > france.y_pos && mouseY < france.y_pos + france.height) {
    cursor(HAND);
  } 
  else if(click_count == 5 && mouseX > russia.x_pos && mouseX < russia.width + russia.x_pos && mouseY > russia.y_pos && mouseY < russia.y_pos + russia.height) {
    cursor(HAND);
  }
  else if(click_count == 6 && mouseX > us.x_pos && mouseX < us.width + us.x_pos && mouseY > us.y_pos && mouseY < us.y_pos + us.height) {
    cursor(HAND);
  }
  else {
    cursor(ARROW);
  }
}

class Country {
  constructor(num_deaths, x_pos, y_pos, width, height, color, target_x, target_y, flag) {
    this.num_deaths = num_deaths;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.target_x = target_x;
    this.target_y = target_y;
    this.current_square_index = 0;
    this.interval = 500; // Time interval in milliseconds
    this.last_time = 0;
    this.state = 'display'; // Initial state
    this.show = false;
    this.flag = flag;
    this.show_text = true;

    // For bodies to drop
    this.animDone = false;
    this.bodySize = innerHeight * 0.01;

    this.minSpeed = innerHeight * 0.001;
    this.maxSpeed = innerHeight * 0.01;
    this.bodySpeed = random(this.minSpeed, this.maxSpeed);

    // Initialize an array to store the positions of the ellipses
    this.bodyPositions = [];
    this.initializeBodyPositions();
  }

  initializeBodyPositions() {
    let minX = this.x_pos - this.width / 2 + this.bodySize;
    let maxX = this.x_pos + this.width / 2 - this.bodySize;

    for (let i = 0; i <= this.num_deaths; i++) {
      let bodyX = random(minX, maxX);
      let bodyY = this.y_pos - this.height / 2 - 20;
      let bodySpeed = random(height * 0.001, height * 0.01);
      this.bodyPositions.push({ x: bodyX, y: bodyY, speed: bodySpeed });
    }
  }

  display() {
    tint(this.color);
    image(this.flag, this.x_pos - this.width / 2, this.y_pos - this.height / 2, this.width, this.height);
  }

  animate_country_moving() {
    let speed = 2;
    if (this.x_pos != this.target_x || this.y_pos != this.target_y) {
      let dx = this.target_x - this.x_pos;
      let dy = this.target_y - this.y_pos;
      let angle = atan2(dy, dx);
      this.x_pos += cos(angle) * speed;
      this.y_pos += sin(angle) * speed;

      if (abs(dx) < speed) this.x_pos = this.target_x;
      if (abs(dy) < speed) this.y_pos = this.target_y;
    }
    return this.x_pos == this.target_x && this.y_pos == this.target_y;
  }

  dropBodies(numBodies) {
    for (let i = 0; i < numBodies && i < this.bodyPositions.length; i++) {
      tint(255);
      image(skull,
        this.bodyPositions[i].x,
        this.bodyPositions[i].y,
        this.bodySize,
        this.bodySize
      );

      // Make bodies fall
      this.bodyPositions[i].y += this.bodyPositions[i].speed;

      if (this.bodyPositions[i].y > this.y_pos + this.height / 2 - this.bodySize / 2) {
        this.bodyPositions[i].speed = 0;
      }
    }
  }

  allBodiesDropped() {
    return this.bodyPositions.every(pos => pos.speed === 0);
  }

  resetBodyPositions() {
    this.bodyPositions = [];
    this.initializeBodyPositions();
  }
}