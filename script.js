function getWeather() {
    const apiKey = '9ea3edc6aa68ae7b58c28de42fb4527e';
    const city = document.getElementById('city').value;

    if(!city){
        alert("Kindly enter a city");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
    .then(response=>response.json())
    .then(data=>{
        displayWeather(data);
    })
    .catch(error=>{
        console.error("Error fetching the current weather data:",error);
        alert("There's some error, please try again.");   
     });

     fetch(forecastUrl)
    .then(response=>response.json())
    .then(data=>{
        displayHourlyForecast(data.list);
    })
    .catch(error=>{
        console.error("Error fetching the weather forecast data:",error);
        alert("There's some error, please try again.");   
     });
}

function displayWeather(data){

    const tempDiv = document.getElementById('temp');
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const waetherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourlyForecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDiv.innerHTML = '';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}C</p>`;

        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>`;

        tempDiv.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        waetherIcon.src = iconUrl;
        waetherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourlyForecast');
    const next24hours = hourlyData.slice(0, 8);

    next24hours.forEach(item => {

        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}C</span>
        </div>;`
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage(){

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}