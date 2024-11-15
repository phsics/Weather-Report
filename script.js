document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "525f59b0604414d32f07d28eb9949fc4";    // env variables

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if(!city) return;
        
        // it may throw an error
        // server/database is always in another continent

        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch(error){
            showError();
        }
    })

    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            document.body.style.backgroundImage = "none";
            throw new Error("City not found");

        }
        const data = await response.json();

        return data;
    }
    
    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        
        temperatureDisplay.textContent = `Temperature : ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        
   
        const temperature = main.temp;
        const body = document.body;
    
        if (temperature > 25) {
            body.style.backgroundImage = "url('assets/summer.jpg')";
        } else if (temperature >= 10 && temperature <= 25) {
            body.style.backgroundImage = "url('assets/Normal.jpg')";
        } else {
            body.style.backgroundImage = "url('assets/snow.jpg')";
        }

        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";
    }
    
    function showError(){
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});