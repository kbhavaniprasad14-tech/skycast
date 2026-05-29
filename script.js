const apiKey = "d5255702d416654a26ef1e4e7cae429c";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function getWeather(city){

    try{

        loading.style.display = "block";
        weatherInfo.style.display = "none";
        error.textContent = "";

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;

        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} km/h`;

        weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherInfo.style.display = "block";

    }
    catch(err){

        error.textContent = err.message;

    }
    finally{

        loading.style.display = "none";

    }

}

searchBtn.addEventListener("click", ()=>{

    const city = cityInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){
        searchBtn.click();
    }

});

getWeather("Hyderabad");