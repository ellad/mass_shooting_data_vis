let uk_show = true;
let canada_show = false;
let germany_show = false;
let france_show = false;
let russia_show = false;
let us_show = false;

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
let uk_height = 20;
let canada_width = uk_width * 2;
let canada_height = uk_height * 2;
let germany_width = canada_width * 1.5;
let germany_height = canada_height * 1.5;
let france_width = germany_width * 1.3;
let france_height = germany_height * 1.3;
let russia_width = france_width * 1.7;
let russia_height = france_height * 1.7;
let us_width = russia_width * 82;
let us_height = russia_height * 82;

let time;
let country_array = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  uk = new Country(0, width / 2, height / 2, uk_width, uk_height, '#E72B2B', 0, 0, 'UK');
  country_array.push(uk);
  canada = new Country(2, width / 2, height / 2, canada_width, canada_height, '#CD2121', uk.width, 0, 'Canada');
  country_array.push(canada);
  germany = new Country(7, width / 2, height / 2, germany_width, germany_height, '#B41818', uk.width + canada.width, 0, 'Germany');
  country_array.push(germany);
  france = new Country(7, width / 2, height / 2, france_width, france_height, '#B41818', uk.width + canada.width + germany.width, 0, 'France');
  country_array.push(france);
  russia = new Country(158, width / 2, height / 2, russia_width, russia_height, '#9A0E0E', uk.width + canada.width + germany.width + france.width, 0, 'Russia');
  country_array.push(russia);
  us = new Country(410, width / 2, height / 2, us_width, us_height, '#800404', uk.width + canada.width + germany.width + france.width + russia.width, 0, 'US');
  country_array.push(us);
  time = millis() + 100;
}

function draw() {
  background(0);

  for (let country of country_array) {
    if (country.show) {
      country.display_text();
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
}

function mousePressed() {
  click_count++;
  if (click_count == 1) {
    uk.show = true;
    uk.state = 'dropBodies';
  } else if (click_count == 2) {
    uk.hide_text();
    canada.show = true;
    canada.state = 'dropBodies';
  } else if (click_count == 3) {
    canada.hide_text();
    germany.show = true;
    germany.state = 'dropBodies';
  } else if (click_count == 4) {
    germany.hide_text();
    france.show = true;
    france.state = 'dropBodies';
  } else if (click_count == 5) {
    france.hide_text();
    russia.show = true;
    russia.state = 'dropBodies';
  } else if (click_count == 6) {
    russia.hide_text();
    us.show = true;
    us.state = 'dropBodies';
  }
}

class Country {
  constructor(num_deaths, x_pos, y_pos, width, height, color, target_x, target_y, name) {
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
    this.name = name;
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
      let bodyY = this.y_pos - this.height / 2;
      let bodySpeed = random(height * 0.001, height * 0.01);
      this.bodyPositions.push({ x: bodyX, y: bodyY, speed: bodySpeed });
    }
  }

  display() {
    fill(this.color);
    rect(this.x_pos - this.width / 2, this.y_pos - this.height / 2, this.width, this.height);
  }

  display_text() {
    if (this.show_text) {
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(20);
      text(this.name, this.x_pos, this.y_pos + this.height / 2 + 20);
    }
  }

  hide_text() {
    this.show_text = false;
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
      fill(255);
      ellipse(
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
}