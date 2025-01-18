const weatherInfoDiv = document.getElementById("weather-info");
const searchBtn = document.getElementById("search-btn");
const currentLocationBtn = document.getElementById("current-location-btn");
const locationInput = document.getElementById("location-input");

// Fetch weather data
async function fetchWeather(location) {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>Unable to fetch weather data. Please try again.</p>`;
    }
}

// Display weather data
function displayWeather(data) {
    weatherInfoDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels Like: ${data.main.feels_like}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Use current location
currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            error => {
                weatherInfoDiv.innerHTML = `<p>Location access denied.</p>`;
            }
        );
    } else {
        weatherInfoDiv.innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
    }
});

async function fetchWeatherByCoords(lat, lon) {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>Unable to fetch weather data. Please try again.</p>`;
    }
}

// Search weather by location input
searchBtn.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        weatherInfoDiv.innerHTML = `<p>Please enter a location.</p>`;
    }
});
