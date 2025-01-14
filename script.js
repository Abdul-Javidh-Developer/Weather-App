const apiKey = 'ac2a49da6f1e411d939c30f27734b0cf'; // Your API key

// Function to fetch weather data based on city name
function getWeather() {
  const city = document.getElementById('city').value; // Get city name from input field
  const errorMessage = document.getElementById('error-message');
  const resultDiv = document.getElementById('result');
  const weatherInfo = document.getElementById('weather-info');
  const cloudImage = document.getElementById('cloud-image');

  // Step: 1 [Clear previous messages and results]
  errorMessage.textContent = '';
  weatherInfo.style.display = 'block';
  cloudImage.innerHTML = '';

  // Step: 2 [Check if the Input box isEmpty or Not]
  if (!city) {
    resultDiv.textContent = 'Please enter a city name.';
    resultDiv.style.display = "block";
    return; 
  }else{
     resultDiv.style.display = "none";
  }

  if(city != weatherInfo) {
    errorMessage.textContent = '';
    errorMessage.style.display = "block";
  }else{
    errorMessage.style.display = "none";

  }

  // Step:3 [Fetch weather data from OpenWeatherMap API]

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found.');
      }
      else{
      return response.json();
      }
    })
    .then(data => {
      // Extract weather details from the API response
      const { temp, humidity } = data.main;
      const description = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const condition = data.weather[0].main.toLowerCase();
  
    //  Step:4 [Display the weather details]
       
      weatherInfo.style.display = 'block';
      document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
      document.getElementById('description').textContent = `Condition: ${description}`;
      document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
      document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;

    //Step:5  [Set cloud image based on weather condition]
      const cloudImages = {
        clear: 'https://img.icons8.com/ios/100/sun.png',
        clouds: 'https://img.icons8.com/ios/100/clouds.png',
        rain: 'https://img.icons8.com/ios/100/rain.png',
        default: 'https://img.icons8.com/ios/100/partly-cloudy-day.png'
      };

      cloudImage.innerHTML = `<img src="${cloudImages[condition] || cloudImages.default}" alt="${condition}">`;
    })

    // Step:6 [ Handle any errors (e.g., invalid city name)]
    .catch(error => {
      errorMessage.textContent = error.message;
    });
}

