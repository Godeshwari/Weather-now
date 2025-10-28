const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const forecastContainer = document.getElementById("forecast");
const error = document.getElementById("error");
const loading = document.getElementById("loading");

const apiBase = "https://api.open-meteo.com/v1/forecast";

// Ask for location permission
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeatherByLocation, showError);
  } else {
    error.textContent = "Geolocation not supported in your browser.";
    error.classList.remove("hidden");
  }
};

// Show weather based on current location
async function showWeatherByLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  loading.classList.remove("hidden");
  try {
    // Reverse geocoding for location name
    const geoRes = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`);
    const geoData = await geoRes.json();
    const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || "Your Location";

    await getWeather(lat, lon, city);
  } catch (err) {
    error.textContent = "Unable to get your location name.";
    error.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}

// Error for geolocation
function showError() {
  error.textContent = "Location permission denied. Please search manually.";
  error.classList.remove("hidden");
}

// Fetch weather by city name
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  loading.classList.remove("hidden");
  try {
    const geoRes = await fetch(`https://geocode.maps.co/search?q=${city}&limit=1`);
    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error("City not found");

    const { lat, lon, display_name } = geoData[0];
    await getWeather(lat, lon, display_name);
  } catch (err) {
    error.textContent = "City not found. Try again!";
    error.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
});

// Main weather + forecast
async function getWeather(lat, lon, cityName) {
  const res = await fetch(
    `${apiBase}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
  );
  const data = await res.json();
  const current = data.current_weather;

  const weatherDesc = getWeatherDescription(current.weathercode);

  weatherResult.innerHTML = `
    <h2>${cityName}</h2>
    <h3>${weatherDesc}</h3>
    <p>🌡️ Temperature: ${current.temperature}°C</p>
    <p>💨 Wind Speed: ${current.windspeed} km/h</p>
  `;

  weatherResult.classList.remove("hidden");
  error.classList.add("hidden");

  // Render 7-day forecast
  forecastContainer.innerHTML = "<h3>7-Day Forecast</h3>";
  for (let i = 0; i < data.daily.time.length; i++) {
    const day = new Date(data.daily.time[i]).toLocaleDateString("en-US", {
      weekday: "short",
    });
    const desc = getWeatherDescription(data.daily.weathercode[i]);
    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <span>${day}</span>
        <span>${desc}</span>
        <span>${data.daily.temperature_2m_min[i]}° / ${data.daily.temperature_2m_max[i]}°</span>
      </div>`;
  }

  forecastContainer.classList.remove("hidden");
}

function getWeatherDescription(code) {
  const map = {
    0: "Clear ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Cloudy ☁️",
    45: "Fog 🌫️",
    48: "Rime Fog 🌫️",
    51: "Light Drizzle 🌦️",
    61: "Light Rain 🌧️",
    71: "Snowfall ❄️",
    95: "Thunderstorm ⛈️",
  };
  return map[code] || "Unknown";
}
