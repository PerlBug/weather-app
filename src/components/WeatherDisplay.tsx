import React from "react";

interface WeatherDisplayProps {
  date?: string;
  desc?: string;
  abbr?: string;
  windSpeed?: number;
  maxTemp?: number;
  minTemp?: number;
}

function WeatherDisplay(props: WeatherDisplayProps) {
  const { date, desc, abbr, windSpeed, maxTemp, minTemp } = props;

  return (
    <div className="flex flex-col p-6 items-center">
      <div className="leading-3">
        <b>Date</b>
      </div>

      <div className="font-light">{date}</div>

      <div className="leading-3 mt-3">
        <b>Weather</b>
      </div>
      {abbr && (
        <div className="mt-2">
          <img
            src={`https://www.metaweather.com/static/img/weather/${abbr}.svg`}
            alt={desc}
            style={{ height: "30px" }}
          />
        </div>
      )}
      <div className="font-light">{desc}</div>

      <div className="font-light">Max: {maxTemp}°C</div>
      <div className="font-light">Min: {minTemp}°C</div>

      <div className="leading-3 mt-3">
        <b>Wind Speed</b>
      </div>
      <div className="font-light">{windSpeed}mph</div>
    </div>
  );
}

export default WeatherDisplay;
