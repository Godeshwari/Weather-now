🌀 WEATHER-NOW

Weather Now is a responsive web application that allows users to check current weather conditions 
and 7-day forecasts for any city — or automatically detect their current location to show live weather updates.
It uses the Open-Meteo API for real-time weather data .



🌟 Features

✅ Real-Time Weather: Instantly displays temperature, wind speed, and weather conditions.

✅ 7-Day Forecast: Shows daily minimum and maximum temperatures with weather icons.

✅ Auto Location Detection: Detects your current location using browser geolocation.

✅ Search Any City: Enter any city name to get local weather details.

✅ Celsius & Fahrenheit: Displays temperatures in both °C and °F for clarity.

✅ Dark-Themed UI: Clean and modern dark glass-style weather cards.

✅ Animated Background: Soft gradient animation for an engaging experience.

✅ Responsive Design: Fully compatible with mobile, desktop, and Mac.


🧩 Tech Stack

• HTML5 – Structure of the web page

• CSS3 – Styling with modern gradient backgrounds and animations

• JavaScript (ES6) – API integration and dynamic content updates

• Open-Meteo API – Free weather data (current + 7-day forecast)

• Geocode API (maps.co) – Used for reverse geocoding (get city name from coordinates)




⚙ Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/Godeshwari/weather-Now.git

2️⃣ Navigate to the project directory

cd weather-now

3️⃣ Open the project

Simply open the index.html file in your browser, or use a local server:

- If you have VS Code:
npx live-server



🌍 API Reference

1. Open-Meteo API:

Used for fetching weather data:

https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto

2. Geocode (maps.co):

Used for reverse geocoding to get city names:

https://geocode.maps.co/reverse?lat={lat}&lon={lon}




💡 How It Works

1️⃣ On page load, the app asks for location permission.

2️⃣ If granted, it fetches your latitude and longitude using navigator.geolocation.

3️⃣ The app then requests weather data from Open-Meteo API for those coordinates.

4️⃣ If denied, you can manually search for a city to get its weather.

5️⃣ The 7-day forecast displays below the main weather card.



🖼 Screenshots











| Feature             | Preview                                           |
| ------------------- | ------------------------------------------------- |
| 🌤 Current Weather | Shows temperature, weather condition & wind speed |
| 📅 7-Day Forecast   | Displays min/max temperature  |
| 📱 Responsive View  | Works smoothly on mobile & desktop               |

