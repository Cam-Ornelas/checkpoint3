'use strict';
$(document).ready(function(){
  var balls = 0,
      ballsGain = 1,
      autoGain = 1,
      text,
      collectLevel = 1,
      collectLevelTwo = 1,
      price,
      priceTwo,
      theInterval,
      clickCounter = 0;

  var element ={
      clicks     : document.getElementById("clicks"),
      clicker     : document.getElementById("clicker"),
      collect    : document.getElementById("collect"),
      collectTwo : document.getElementById("collect-two"),
      balls       : document.getElementById("balls"),
}

  updateBalls();
  updateCollect();
  updateCollectTwo();

element.clicker.onclick = function() { addBalls(); updateBalls(); };


function updateClickCounter(){
  clickCounter++;
  element.clicks.innerHTML = "Clicks: " + clickCounter;
}

function addBalls(){
  balls = balls + ballsGain;
}

function updateCollect(){
  element.collect.innerHTML = "<b>" + price + " Balls" + ":" + "</b>" + " Balls per click x2";
}

function updateCollectTwo(){
  element.collectTwo.innerHTML = "<b>" + priceTwo + " Balls" + ":" + "</b>" + " +5 every second";
}

function updateBalls(){
  text = "#" + balls;
  collectNotifier();
  element.balls.innerHTML = text;
}

function collectNotifier(){
  price = ballsGain * 25 * collectLevel;
  priceTwo = 200 * collectLevelTwo;

  if(balls >= price){
    updateCollect();
    element.collect.onclick = multiplyBallsGain;
    element.collect.disabled = false;
  }

  if(balls >= priceTwo){
    updateCollectTwo();
    element.collectTwo.onclick = function() { autoBalls(collectLevelTwo); };
    element.collectTwo.disabled = false;
  }
}

function multiplyBallsGain(){
  ballsGain = ballsGain * 2;
  collectLevel++;
  updateAndDisable("collect", price);
}

function autoBalls(amount){
  clearInterval(theInterval);
  theInterval = setInterval(function(){ balls = balls + autoGain; updateBalls(); }, 200 / amount);
  collectLevelTwo++;
  updateAndDisable("collect-two", priceTwo);
}

function updateAndDisable(elementId, p){
  balls = balls - p;
  updateBalls();

  if(elementId == "collect"){
    updateCollect();
  }

  else if( elementId == "collect-two"){
    updateCollectTwo();
  }

  element.collect.disabled = true;
  element.collectTwo.disabled = true;
  collectNotifier();
}

});
