const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card= document.querySelector(".card");

const apiKey = "55aa665d976ca7286eeccd91c3f3739d";

weatherForm.addEventListener("submit", async event => {

event.preventDefault();

const city = cityInput.value;

if(city){
  try{
    const weatherData = await getWeatherData(city);
    displayWeatherInfo(weatherData);
    console.log(weatherData)

  }catch (error){
   console.log(error)
   displayError(error)
  }

}else{
  displayError("Please Enter a city")
}
});

async function getWeatherData(city) {
const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&limit=5&appid=${apiKey}`
    );

  console.log(response);

  if(!response.ok) {
    throw new Error ("could not fetch weather data")
  }

  return await response.json();

}

function displayWeatherInfo(data) {

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h2");
    const temDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherIcon = document.getElementById("weatherIcon");

    cityDisplay.textContent = data.name;
    temDisplay.textContent = "Temperature:" + data.main.temp + "°C";
    humidityDisplay.textContent = "Humidity:" + data.main.humidity + "%";
    weatherIcon.src =  `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    

    cityDisplay.classList.add("cityDisplay");
    temDisplay.classList.add("temDisplay");
    humidityDisplay.classList.add("humidityDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(temDisplay);
    card.appendChild(humidityDisplay);;

 }