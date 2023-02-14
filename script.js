let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentHours = currentTime.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes}`;

  return formattedDate;
}

let todaysDate = document.querySelector(".currentDay");
todaysDate.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#enterCity-form");
searchForm.addEventListener("submit", handleSubmit);

let userLocationButton = document.querySelector("#userLocation");
userLocationButton.addEventListener("click", getCurrentLocation);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let ApiKey = "b85c634171b157188784d23b9b181370";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
  axios.get(ApiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  document.querySelector("#currentTempNo").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weatherType").innerHTML = response.data.weather[0].description;
  document.querySelector("#searchedCity").innerHTML = response.data.name;
}

function searchLocation(position) {
  let apiKey = "b85c634171b157188784d23b9b181370";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event){
 event.preventDefault();
 navigator.geolocation.getCurrentPosition(searchLocation); }


