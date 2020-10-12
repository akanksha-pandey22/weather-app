//Feature1
let currentTime = new Date();

let currentHour = currentTime.getHours();
let ampm = currentHour >= 12 ? "PM" : "AM";
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMins = currentTime.getMinutes();
if (currentMins < 10) {
  currentMins = `0${currentMins}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let day = days[currentTime.getDay()];
let month = months[currentTime.getMonth()];
let year = currentTime.getFullYear();
let date = currentTime.getDate();
if (date < 10) {
  date = `0${date}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;

let time = document.querySelector("#current-time");
time.innerHTML = `${currentHour}:${currentMins} ${ampm}`;

//Feature2

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayedCity = response.data.name;
  let todayWeather = response.data.weather[0].main;
  //console.log(todayWeather);

  let todayHumidity = response.data.main.humidity;
  //console.log(todayHumidity);

  let todayWindSpeed = Math.round(response.data.wind.speed);
  //console.log(todayWindSpeed);

  let tempHeading = document.querySelector("h5");
  tempHeading.innerHTML = `Today is ${temperature}°C`;

  let cityDispalyed = document.querySelector("h2");
  cityDispalyed.innerHTML = displayedCity;

  let todayWeatherDisplayed = document.querySelector(
    "#current-state-of-weather-sunny"
  );
  todayWeatherDisplayed.innerHTML = todayWeather;

  let todayHumidityDisplayed = document.querySelector(
    "#current-humidity-percentage"
  );
  todayHumidityDisplayed.innerHTML = `${todayHumidity}%`;

  let todayWindDisplayed = document.querySelector("#current-wind-speed");
  todayWindDisplayed.innerHTML = `${todayWindSpeed}mph`;
}

let apiKey = "fef38b882b534b153098ddc0f2902952";

function searchCity(event) {
  event.preventDefault();

  let inputCity = document.querySelector("#enter-city");
  console.log(inputCity);
  let city = inputCity.value;
  console.log(city);

  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchCity);

//Bonus point

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getLocation);
