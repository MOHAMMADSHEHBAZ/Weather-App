import React, { useState ,useEffect} from "react";
import axios from 'axios'

import "./weather.css";

import wind from "./images/wind.png";
import humidity from "./images/humidity.png";
import cloud from './Weather-gif/clouds.gif'
import clear from './Weather-gif/sun.gif'
import rain from './Weather-gif/rain.gif'
import snow from './Weather-gif/snowflake.gif'
import drizzle from './Weather-gif/clouds.gif'
import strome from './Weather-gif/storm.gif'
import mist from './Weather-gif/wind.gif'


export default function Weatherbox() {

  var Time = new Date().toLocaleTimeString();
  const[cTime,uTime]=useState(Time);
  const updateTime = () =>{
    Time = new Date().toLocaleTimeString();
    uTime(Time);
  }
  setInterval(updateTime,1000);

  const dateG = (e) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  };


  let api_key = "73c969463cb3b13474ae65c858ca443b";

  const [weather, setWeather] = useState(null);
  const [wimg, setWimg] = useState(mist);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=New Delhi&units=Metric&appid=${api_key}`);
        setWeather(response.data);
        setWeatherImage(response.data.weather[0].icon);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const search = async (event) => {
    if (event) event.preventDefault();
    if (searchQuery === "") {
      return;
    }
    let url =
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=Metric&appid=${api_key}`;
       let response = await fetch(url);
       let data = await response.json();
       setWeather(data);
       setWeatherImage(data.weather[0].icon); 
  };

       const setWeatherImage = (icon) => {
        switch (icon) {
          case "01d":
          case "01n":
            setWimg(clear);
            break;
          case "02d":
          case "02n":
            setWimg(cloud);
            break;
          case "03d":
          case "03n":
            setWimg(drizzle);
            break;
          case "04d":
          case "04n":
            setWimg(drizzle);
            break;
          case "09d":
          case "09n":
            setWimg(rain);
            break;
          case "10d":
          case "10n":
            setWimg(rain);
            break;
          case "11d":
          case "11n":
            setWimg(strome);
            break;
          case "13d":
          case "13n":
            setWimg(snow);
            break;
          default:
            setWimg(mist);
            break;
        }
      };
     
  return (
    <>
      <div className="Weatherbox">
        <div className="mainbox">
          <form className="searchbox" onSubmit={search}>
            <input class="input" name="text" placeholder="Search..." type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div
              className="search"
              onClick={() => {
                search();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </form>
          <div className="main">
            <div className="left">
            {weather ? (
              <>
                <div>
                  <p className="temp">{weather.main.temp}°c</p>
                </div>
                <div>
                  <h3 className="City">{weather.name}</h3>
                </div>
                <div>
                  <i><p className="Humidity">{weather.main.humidity}% Humidity</p></i>
                </div>
                <div>
                  <img src={humidity} alt="wind" />
                </div>
                <div>
                  <i><p className="Wind">{weather.wind.speed} km/h Wind Speed</p></i>
                </div>
                <div>
                <img src={wind} alt="wind" />
                </div>
              </>
            ) : (
              <div></div>
            )}
            </div>
            <div className="right">
              <div className="weatherimg">
                <img src={wimg} alt="weather" />
              </div>
                <div className="date">{dateG(new Date())}</div>
                {/* <div className="time">{cTime}</div> */}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
