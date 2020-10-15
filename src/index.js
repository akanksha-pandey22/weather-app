
function formatDate(timestamp){
  let date=new Date(timestamp);
  let days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  let day=days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`
}

function formatHours(timestamp){
  let date=new Date(timestamp);
  let hours=date.getHours();
  if (hours<10){
    hours=`0${hours}`;
  }
  let minutes=date.getMinutes();
  if (minutes<10){
    minutes=`0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature(response){
  console.log(response.data.main.temp);
  let temperatureElement=document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement=document.querySelector("#humidity");
  let speedElement=document.querySelector("#speed");
  let dateElement=document.querySelector("#date");
  let iconElement=document.querySelector("#weather-icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  speedElement.innerHTML=Math.round(response.data.wind.speed);
  dateElement.innerHTML=formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);
  console.log(response.data);
}

let apiKey="fef38b882b534b153098ddc0f2902952";

function displayForecast(response){
  
  let forecastElement = document.querySelector("#forecast-weather");
  forecastElement.innerHTML=null;
  let forecast=null;

  for (let index = 0; index < 6; index++) {
  forecast=response.data.list[index];
  forecastElement.innerHTML+= `<div class="col2 mt-5">
  <h5>
  ${formatHours(forecast.dt * 1000)}
  </h5>
  <img 
  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
  alt=""  />
  <div class="forecast-temperature">
  <strong>${Math.round(forecast.main.temp_max)}°</strong>
  ${Math.round(forecast.main.temp_min)}°
</div>
  </div>`;
   
}

}


function search(city){
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);

}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
  
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32;
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);

}

search("Mumbai");

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);

}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getLocation);

let celsiusTemperature = null;

let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);