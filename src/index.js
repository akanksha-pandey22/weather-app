
function formatDate(timestamp){
  let date=new Date(timestamp);
  let hours=date.getHours();
  if (hours<10){
    hours=`0${hours}`;
  }
  let minutes=date.getMinutes();
  if (minutes<10){
    minutes=`0${minutes}`;
  }
  let days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  let day=days[date.getDay()];
  return `${day} ${hours}:${minutes}`


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
 
  temperatureElement.innerHTML=Math.round(response.data.main.temp);
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

function search(city){
 
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}



function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
  
}

search("New Delhi");

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getLocation);








let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

