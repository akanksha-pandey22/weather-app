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
 
  temperatureElement.innerHTML=Math.round(response.data.main.temp);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  speedElement.innerHTML=Math.round(response.data.wind.speed);
  dateElement.innerHTML=formatDate(response.data.dt * 1000);
  console.log(response.data);
}

let apikey="fef38b882b534b153098ddc0f2902952";
let apiUrl=`https:api.openweathermap.org/data/2.5/weather?q=New Delhi&appid=${apikey}&units=metric`;




axios.get(apiUrl).then(displayTemperature);