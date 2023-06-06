function getWeather() {
  var locationInput = document.getElementById('locationInput');
  var location = locationInput.value;
  var apiKey = '9bb939e5bb9750061723794d20d29ec9';

  if (location === '') {
      alert('Please enter a location');
      return;
  }

  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey;

  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Unable to fetch weather data. Please try again.');
      }
      return response.json();
    })
    .then(function(data) {
      displayWeather(data);
      displayWeatherIcons(data);
      getForecast(location);
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert(error.message);
    });
}

function displayWeather(data) {
  var weatherTemperature = document.getElementById('weatherTemperature');
  weatherTemperature.innerHTML = '';

  var cityName = data.name;
  var temperature = data.main.temp;
  var description = data.weather[0].description;

  weatherTemperature.setAttribute('data-city', cityName);
  weatherTemperature.setAttribute('data-description', description);
  weatherTemperature.setAttribute('data-temperature', temperature);

  var cityElement = document.createElement('p');
  cityElement.textContent = 'City: ' + cityName;

  var tempElement = document.createElement('p');
  tempElement.textContent = 'Temperature: ' + temperature.toFixed(2) + '°C';

  var descElement = document.createElement('p');
  descElement.textContent = 'Description: ' + description;

  weatherTemperature.appendChild(cityElement);
  weatherTemperature.appendChild(tempElement);
  weatherTemperature.appendChild(descElement);

  changeBackgroundImage(description); // Call the function to change the background image
}

function displayWeatherIcons(data) {
  var weatherIcon = document.getElementById('weatherIcon');
  weatherIcon.innerHTML = '';

  var weatherIconCode = data.weather[0].icon;

  var iconElement = document.createElement('img');
  iconElement.src = 'https://openweathermap.org/img/wn/' + weatherIconCode + '.png';
  iconElement.alt = 'Weather Icon';

  weatherIcon.appendChild(iconElement);
}

function getForecast(location) {
  var apiKey = '9bb939e5bb9750061723794d20d29ec9';
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&appid=' + apiKey;

  fetch(forecastUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Unable to fetch forecast data. Please try again.');
      }
      return response.json();
    })
    .then(function(data) {
      displayForecast(data);
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert(error.message);
    });
}

function displayForecast(data) {
  var forecastElement = document.getElementById('forecast');
  forecastElement.innerHTML = '';

  var forecastData = data.list;

  for (var i = 0; i < forecastData.length; i++) {
    var forecastItem = forecastData[i];
    var forecastDateTime = forecastItem.dt_txt;
    var forecastTemperature = forecastItem.main.temp;
    var forecastDescription = forecastItem.weather[0].description;

    var forecastItemElement = document.createElement('div');
    forecastItemElement.classList.add('forecast-item');

    var forecastDateTimeElement = document.createElement('p');
    forecastDateTimeElement.textContent = 'Date/Time: ' + forecastDateTime;

    var forecastTemperatureElement = document.createElement('p');
    forecastTemperatureElement.textContent = 'Temperature: ' + forecastTemperature + '°C';

    var forecastDescriptionElement = document.createElement('p');
    forecastDescriptionElement.textContent = 'Description: ' + forecastDescription;

    forecastItemElement.appendChild(forecastDateTimeElement);
    forecastItemElement.appendChild(forecastTemperatureElement);
    forecastItemElement.appendChild(forecastDescriptionElement);

    forecastElement.appendChild(forecastItemElement);
  }
}

function convertTemperature(event, unit) {
  var temperatureButtons = document.getElementById('temperatureButtons').getElementsByTagName('button');

  // Remove 'active' class from all buttons
  for (var i = 0; i < temperatureButtons.length; i++) {
    temperatureButtons[i].classList.remove('active');
  }

  // Add 'active' class to the clicked button
  event.target.classList.add('active');

  // Get the temperature value, city, and description from the weather data
  var weatherTemperature = document.getElementById('weatherTemperature');
  var temperature = parseFloat(weatherTemperature.getAttribute('data-temperature'));
  var city = weatherTemperature.getAttribute('data-city');
  var description = weatherTemperature.getAttribute('data-description');
  var convertedTemperature = convertTemperatureUnit(temperature, unit);

  // Update the displayed temperature with the converted value
  weatherTemperature.innerHTML = '';
  var cityElement = document.createElement('p');
  cityElement.textContent = 'City: ' + city;

  var tempElement = document.createElement('p');
  tempElement.textContent = 'Temperature: ' + convertedTemperature.toFixed(2) + getTemperatureUnitSymbol(unit);

  var descElement = document.createElement('p');
  descElement.textContent = 'Description: ' + description;

  weatherTemperature.appendChild(cityElement);
  weatherTemperature.appendChild(tempElement);
  weatherTemperature.appendChild(descElement);
}

function convertTemperatureUnit(temperature, unit) {
  if (unit === 'C') {
    return temperature - 273.15; // Convert from Kelvin to Celsius
  } else if (unit === 'F') {
    return (temperature - 273.15) * 1.8 + 32; // Convert from Kelvin to Fahrenheit
  } else {
    return temperature; // Return temperature as is
  }
}

function getTemperatureUnitSymbol(unit) {
  if (unit === 'C') {
    return '°C';
  } else if (unit === 'F') {
    return '°F';
  } else {
    return 'K';
  }
}

function autoCompleteLocation() {
  // Implement autocomplete functionality for location input
  // You can use libraries like Google Places Autocomplete or other autocomplete libraries
}

function getHistoricalWeather(location, date) {
  var apiKey = '9bb939e5bb9750061723794d20d29ec9';
  var historicalUrl = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={date}&appid=' + apiKey;

  // Replace {lat}, {lon}, and {date} with the latitude, longitude, and date of the location respectively

  fetch(historicalUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Unable to fetch historical weather data. Please try again.');
      }
      return response.json();
    })
    .then(function(data) {
      // Display the historical weather information
      displayHistoricalWeather(data);
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert(error.message);
    });
}

function displayHistoricalWeather(data) {
  // Implement the display of historical weather information
  // You can create HTML elements dynamically to show the historical data
}

// Function to change the background image based on the weather condition
function changeBackgroundImage(weatherCondition) {
var body = document.querySelector('body');
var backgroundColor;

switch (weatherCondition) {
  case 'clear sky':
    backgroundColor = 'clear-sky';
    break;
  case 'few clouds':
    backgroundColor = 'few-clouds';
    break;
  case 'scattered clouds':
    backgroundColor = 'scattered-clouds';
    break;
  case 'broken clouds':
    backgroundColor = 'broken-clouds';
    break;
  case 'rain':
    backgroundColor = 'rain';
    break;
  case 'moderate rain':
    backgroundColor = 'moderate-rain';
    break;
  case 'shower rain':
    backgroundColor = 'shower-rain';
    break;
  case 'thunderstorm':
    backgroundColor = 'thunderstorm';
    break;
  case 'thunderstorm with rain':
    backgroundColor = 'thunderstorm-with-rain';
    break;
  case 'snow':
    backgroundColor = 'snow';
    break;
  case 'mist':
    backgroundColor = 'mist';
    break;
  case 'overcast clouds':
    backgroundColor = 'overclast-clouds';
    break;
  default:
    backgroundColor = '';
    break;
}

body.className = backgroundColor;
}

// Show/hide the "go up" icon based on scroll position
window.addEventListener('scroll', function() {
const goUpIcon = document.querySelector('.go-up');
if (window.pageYOffset > 0) {
  goUpIcon.style.display = 'block';
} else {
  goUpIcon.style.display = 'none';
}
});

// Smooth scroll to top
document.querySelector('.go-up').addEventListener('click', function(event) {
event.preventDefault();
const targetPosition = 0;
const startPosition = window.pageYOffset;
const distance = targetPosition - startPosition;
const duration = 1000; // Adjust the duration (in milliseconds) as desired

let start = null;
function step(timestamp) {
  if (!start) start = timestamp;
  const progress = timestamp - start;
  window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
  if (progress < duration) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
});

// Easing function (cubic easing in/out)
function easeInOutCubic(t, b, c, d) {
t /= d / 2;
if (t < 1) return c / 2 * t * t * t + b;
t -= 2;
return c / 2 * (t * t * t + 2) + b;
}