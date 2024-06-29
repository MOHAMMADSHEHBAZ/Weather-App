import React, { useState } from "react";

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

  const [wimg,setwimg]=useState(mist);

  const search = async () => {
    const elem = document.getElementsByClassName("input");
    if (elem[0].value === "") {
      return 0;
    }
    let url =
      `https://api.openweathermap.org/data/2.5/weather?q=${elem[0].value}&units=Metric&appid=${api_key}`;
       let response = await fetch(url);
       let data = await response.json()
       const humidity = document.getElementsByClassName("Humidity");
       const wind = document.getElementsByClassName("Wind");
       const temp = document.getElementsByClassName("temp");
       const loc = document.getElementsByClassName("City");

       humidity[0].innerHTML = data.main.humidity+"% Humidity";
       wind[0].innerHTML = data.wind.speed+"km/h Wind Speed";
       temp[0].innerHTML = data.main.temp+"°c";
       loc[0].innerHTML = data.name;
       if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
          setwimg(clear)
       }
       else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setwimg(cloud)
     }
       else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setwimg(drizzle)
     }
       else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setwimg(drizzle)
     }
       else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setwimg(rain)
     }
       else if(data.weather[0].icon==="010d" || data.weather[0].icon==="010n"){
        setwimg(rain)
     }
       else if(data.weather[0].icon==="011d" || data.weather[0].icon==="011n"){
        setwimg(strome)
     }
       else if(data.weather[0].icon==="013d" || data.weather[0].icon==="013n"){
        setwimg(snow)
     }
     else{
      setwimg(mist)
     }
     
  };
  return (
    <>
      <div className="Weatherbox">
        <div className="mainbox">
          <div className="searchbox">
            <input class="input" name="text" placeholder="Search..." type="search"/>
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
          </div>
          <div className="main">
            <div className="left">
              <div className="">
                <p className="temp">30°C</p>
              </div>
              <div className="">
                <h3 className="City">New Delhi</h3>
              </div>
              <div className="">
                <i><p className="Humidity">64% Humidity</p></i>
              </div>
              <div>
                <img src={humidity} alt="Humidity" />
              </div>
              <div className="">
                <i><p className="Wind">18 km/h Wind Speed</p></i>
              </div>
              <div>
                <img src={wind} alt="wind" />
              </div>
            </div>
            <div className="right">
              <div className="weatherimg">
                <img src={wimg} alt="weather" />
              </div>
                <div className="date">{dateG(new Date())}</div>
                <div className="time">{cTime}</div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
