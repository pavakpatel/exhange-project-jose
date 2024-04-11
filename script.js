// Set up some variables
var years = [],
    exchanges = [],
    dataCache;

// Fetch data
d3.csv("data.csv").then(function(data) {
  // Cache data and collect years
  dataCache = data;
  data.forEach(function(d) {
    years.push(+d["Year Founded"]);
    exchanges.push(d["Exchange Name"]);
  });

  // Sort years array
  years.sort(function(a, b){ return a - b; });
}).catch(function(error){
  console.log(error);
});

// Get slider, button and info div
var slider = document.getElementById('yearSlider'),
    playPauseButton = document.getElementById('playPauseButton'),
    exchangeInfo = document.getElementById('exchangeInfo');
    yearinfo = document.getElementById('yearinfo');

// On slider change, update information
// On slider change, update information
slider.oninput = function() {
  var year = this.value,
      exchangeIndex = years.indexOf(+year);

  if (exchangeIndex != -1) {
    // Append new exchange info onto existing content
    exchangeInfo.innerHTML += exchanges[exchangeIndex] + "<br/>";
    yearinfo.textContent = year;
  }
}


  
// Play-Pause functionality
var interval;
playPauseButton.onclick = function() {
  if (this.innerHTML == "Play") {
    this.innerHTML = "Pause";
    interval = setInterval(function() {
      slider.value = +slider.value < +slider.max ? +slider.value + 1 : slider.min;
      slider.oninput();
    }, 1000);
  } else {
    this.innerHTML = "Play";
    clearInterval(interval);
  }
}
