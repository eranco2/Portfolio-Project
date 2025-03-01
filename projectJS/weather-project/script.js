const API_KEY = "f1bd0dfc896d56076b2919346d40fc11";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;

const q = document.getElementById("inputCity");
const button = document.querySelector("button");
const cityName = document.getElementById("city");
const time = document.getElementById("time")
const dayWeek = document.getElementById("dayOfTheWeek")
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");
const startMessage = document.getElementById("startMessage")


async function getDataInfo(city) {
  try {
    // קבלת מידע בשביל המזג אוויר
    const weatherPromise = fetch(WEATHER_URL + city).then(res => res.json());

    const weatherData = await weatherPromise;
    if (weatherData.cod !== 200) {
      throw new Error("city_not_found")
    };

    // קבלת מידע בשביל התאריך והשעה
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    const TIME_URL = `https://api.ipgeolocation.io/timezone?apiKey=495fe3bbcd224417b147325fc7a47c0f&lat=${lat}&long=${lon}`;

    const timePromise = fetch(TIME_URL).then(res => res.json());

    // מחכים לשתי הקריאות במקביל
    const [weatherDataResult, timeDataResult] = await Promise.all([weatherPromise, timePromise]);
    displayWeather(weatherDataResult, timeDataResult);

    // הודעה למקרה והתוכנית קורסת
  } catch (error) {
    if (error.message === "city_not_found") {
      erroring()
      errorMessage.innerText = "Can't find the city, Please try again.";
      console.error("Error:", error);
    }
    else {
      erroring()
      errorMessage.innerText = "There are currently server issues, please try again soon";
      console.error("Error:", error);
    }
  }
}

// שמירת המידע בעת לחיצה על הכפתור
button.addEventListener("click", () => {
  getDataInfo(q.value);
});

// יצירת האוביקטים באתר בעזרת מידע מהAPI
function displayWeather(weatherData, timeData) {
  errorMessage.innerText = "";
  startMessage.innerText = "";
  cityName.innerText = weatherData.name;
  temp.innerText = Math.round(weatherData.main.temp) + "°C";
  description.innerText = weatherData.weather[0].description;
  wind.innerText = `wide speed: ${Math.round(weatherData.wind.speed)} KPH`;
  feelsLike.innerText = `feels like ${Math.round(weatherData.main.feels_like)}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  weatherIcon.alt = weatherData.name;

  // set city time
  time.innerText = timeData.time_24.substring(0, 5).replace(/^0/, "")
  dayWeek.innerText = timeData.date_time_txt.split(",")[0];
  let hourDay = timeData.time_24.substring(0, 5);

  function colorHourTime(hourDay) {
    const backGround = document.querySelector("body")
    backGround.className = ""
    if (hourDay >= "06:00" && hourDay <= "12:00") {
      backGround.classList.add("morning")
      console.log("sunlight");
    } else if (hourDay >= "12:00" && hourDay <= "17:30") {
      backGround.classList.add("sunlight")
      console.log("sunlight");
    } else if (hourDay >= "17:00" && hourDay <= "19:30") {
      backGround.classList.add("sunset")
      console.log("sunset");
    } else {
      backGround.classList.add("night")
      console.log("night");
    }
  }
  colorHourTime(hourDay)

  //logs 
  console.log(weatherData);
  console.log(timeData);

}

// פונקצית שגיאה 
function erroring() {
  cityName.innerText = "";
  temp.innerText = "";
  description.innerText = "";
  wind.innerText = "";
  feelsLike.innerText = "";
  weatherIcon.src = "";
  weatherIcon.alt = "";
  time.innerText = "";
  dayWeek.innerText = "";
  startMessage.innerText = "";
}
