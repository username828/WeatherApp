import { useState } from "react"
import axios from "axios"
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
const WeatherApp=()=>{

    const [city,setCity]=useState("");
    const [currentWeatherData,setCurrentWeatherData]=useState(null);
    const [forecastData,setForecastData]=useState([]);
  
    async function fetchData(e){
        if(e){
            e.preventDefault();
        }
        
        const apiKey=process.env.REACT_APP_API_KEY;

        try{
                //current weather
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        setCurrentWeatherData(res.data);

        console.log(res.data)
        //forecast
        const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const dailyData=forecastRes.data.list.filter(i=>i.dt_txt.includes("12:00:00"))

        
        setForecastData(dailyData.slice(0,4))
        }

        catch(error){
          console.error("Error fetching weather data:", error);
        }
  

    }

  // Function to map OpenWeatherMap weather codes to icons
  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 600){
      return <WiRain className="text-blue-500 animate-rain"/>
    }
    if (weatherId >800){
      return <WiCloudy className="text-gray-400 opacity-80 animate-float"/>;
    } 
    if (weatherId===800){
      return <WiDaySunny className="text-yellow-400 animate-glow"/>;
    } 
    if (weatherId >= 600 && weatherId < 700){
      return <WiSnow className="text-blue-300 animate-snow"/>
    }

    if (weatherId >= 700 && weatherId < 800){
      return <FontAwesomeIcon icon={faSmog} className="text-gray-400 opacity-50 animate-float"/>
    }
    else{
      return <FontAwesomeIcon icon={faSun} />
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex flex-col items-center p-4">
        <form onSubmit={fetchData} className="mb-8 w-full max-w-md flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow p-2 rounded-l-md border border-gray-300"
            placeholder="Enter city"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">Search</button>
        </form>

        {currentWeatherData && (
          <div className="bg-white bg-opacity-65 p-4 rounded-lg shadow-md mb-8 w-full max-w-lg mx-auto relative"> {/* Centered div */}
            <div className="flex items-center justify-center my-2">
              <div className="text-8xl mr-10">{getWeatherIcon(currentWeatherData.weather[0].id)}</div>
              <div className="text-left">
                <h2 className="text-1xl mt-5">Today</h2>
                <h2 className="text-4xl font-bold mt-2">{currentWeatherData.name}</h2>
                <p className="text-1xl mt-4">Temperature: {Math.round(currentWeatherData.main.temp)}°C</p>
                <p className="text-1xl capitalize mt-2">{currentWeatherData.weather[0].description}</p>
              </div>
            </div>

            <div className="flex w-full justify-between space-x-2 mt-2">
              {forecastData.map((day, index) => (
                <div key={index} className="bg-white bg-opacity-55 p-2 rounded-lg shadow-md flex-1 text-center transform translate-y-1/2">
                  <p className="font-semibold">{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}</p>
                  <div className="flex justify-center my-2">
                    <div className="text-5xl">{getWeatherIcon(day.weather[0].id)}</div>
                  </div>
                  <p className="text-lg">{Math.round(day.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp