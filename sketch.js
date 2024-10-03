/*
  US 410 incidents, 410 deaths, no gun control
  UK 1 incident, 0 deaths, gun control
  Canada 2 incidents, 2 deaths, gun control
  Germany 3 incidents, 7 deaths, gun control 
  Frace 4 incidents, 7 deaths, gun control
  Russia 5 incidents, 158 deaths, gun control but strong black market
  total incidents 425, total deaths 584
  */
 
let uk_show = false;
let canada_show = false;
let germany_show = false;
let france_show = false;
let russia_show = false;
let us_show = false;

let click_count = 0;
let percent_Us_incidents = 410/425 * 100;
let percent_UK_incidents = 1/425 * 100; 
let percent_Canada_incidents = 2/425 * 100;
let percent_Germany_incidents = 3/425 * 100;
let percent_France_incidents = 4/425 * 100;
let percent_Russia_incidents = 5/425 * 100;

let percent_Us_deaths = 410/584 * 100;
let percent_UK_deaths = 0/584 * 100;  
let percent_Canada_deaths = 2/584 * 100;
let percent_Germany_deaths = 7/584 * 100;
let percent_France_deaths = 7/584 * 100;
let percent_Russia_deaths = 158/584 * 100;

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
  uk = new Country(1, 0, percent_UK_incidents, percent_UK_deaths, 0, 0, uk_width, uk_height, '#E72B2B');
  country_array.push(uk);
  canada = new Country(2, 2, percent_Canada_incidents, percent_Canada_deaths, 0 + uk.width, 0, canada_width, canada_height, '#CD2121');
  country_array.push(canada);
  germany = new Country(3, 7, percent_Germany_incidents, percent_Germany_deaths, uk.width + canada.width, 0, germany_width, germany_height,'#B41818');
  country_array.push(germany);
  france = new Country(4, 7, percent_France_incidents, percent_France_deaths, germany.width + canada.width + uk.width, 0, france_width, france_height,'#B41818');
  country_array.push(france);
  russia = new Country(5, 158, percent_Russia_incidents, percent_Russia_deaths, germany.width + france.width + uk.width + canada.width, 0, russia_width, russia_height, '#9A0E0E');
  country_array.push(russia);
  us = new Country(410, 410, percent_Us_incidents, percent_Us_deaths, 0, russia.height, us_width, us_height, '#800404');
  country_array.push(us);
  time = millis(); + 100
}

function draw() {
  background(0);
  //uk.display();
  us.animate_death_count();

  // for(let i = 0; i < country_array.length; i++){
  //   country_array[i].display();
  // }

}


function mousePressed(){
  if (click_count == 1){
    uk_show = true;
    click_count++;
  }
  if (click_count == 2){
    canada_show = true;
    click_count++;
  }
  if (click_count == 3){
    germany_show = true;
    click_count++;
  }
  if (click_count == 4){
    france_show = true;
    click_count++;
  }
  if (click_count == 5){
    russia_show = true;
    click_count++;
  }
  if (click_count == 6){
    us_show = true;
    click_count++;
  }
}



class Country {
  constructor(num_incidents, num_deaths, percent_total_incidents, percent_total_deaths, x_pos, y_pos, width, height, color){

    this.num_incidents = num_incidents;
    this.num_deaths = num_deaths;
    this.percent_total_incidents = percent_total_incidents;
    this.percent_total_deaths = percent_total_deaths;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  display(){
    fill(this.color);
    rect(this.x_pos, this.y_pos, this.width, this.height);
    // fill(this.color);
    // rectMode(CENTER);
    // rect(width/2, height/2, 200, 200);
  }

  animate_death_count() {
    //how do I draw squares one at a time in a row?
    //amound of squares = num_deaths
    //each square is 10x10
    //animate by starting at top of screen 
    //When user clicks a certain country, deathcount drops to bottom of screen
    let body_size = height * 0.1;
    let yPos = 0 - body_size
    numBodies = this.num_deaths;
    fill(this.color);
    rect(width/4, yPos, body_size, body_size);
    for (let i = 0; i < numBodies; i++){
      yPos += body_size;
      rect(width/4, yPos, body_size, body_size);
    }

  }

  animate_country_moving(){
    x_speed = 1
    y_speed = 1

    while (this.x_pos > 0 && this.y_pos > 0){
      this.x_pos -= x_speed;
      this.y_pos -= y_speed;
    }
  }
}

class Body {
  constructor(x_pos, y_pos, num_bodies){
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.color = color;
    this.size = height * 0.1;
    this.speed = 1;
  }

  animatte_bodied(){
    fill(this.color);
    rect(this.x_pos, this.y_pos, 10, 10);
  }
}