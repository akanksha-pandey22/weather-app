

function displayTemperature(response){
  console.log(response.data.main.temp);
  let temperatureElement=document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement=document.querySelector("#humidity");
  let speedElement=document.querySelector("#speed");
 
  temperatureElement.innerHTML=Math.round(response.data.main.temp);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  speedElement.innerHTML=Math.round(response.data.wind.speed);
  
  console.log(response.data);
}

let apikey="fef38b882b534b153098ddc0f2902952";
let apiUrl=`https:api.openweathermap.org/data/2.5/weather?q=New Delhi&appid=${apikey}&units=metric`;




axios.get(apiUrl).then(displayTemperature);