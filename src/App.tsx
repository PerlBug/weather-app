import React from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Axios from "axios";
import { IMetaLocation } from "./types/metaWeather";

function App() {
  const [location, setLocation] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  //this will hold the data returned from the location search API
  const [locationResults, setLocationResults] = React.useState<IMetaLocation[]>(
    []
  );

  function onLocationChange(e: any) {
    console.log(e.target.value);
    setLocation(e.target.value);
  }

  function handleSubmit() {
    if (!location) return alert("Please enter your city");
    fetchWeatherData(location);
  }

  async function fetchWeatherData(location: string) {
    try {
      setLoading(true);
      //we are using CORS Anywhere to bypass the CORS problem for now
      //ideally we would route this through our own API service
      const data = (
        await Axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
        )
      ).data;
      setLoading(false);
      setLocationResults(data);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  return (
    <div className="flex flex-col h-full items-center pt-20 text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
      <div className="flex items-center ">
        <h3 className="text-4xl font-light">Weather Forecast</h3>
      </div>
      <div>
        <h3 className="text-1xl font-light">
          Get the latest weather forecast in your area!
        </h3>
      </div>
      <div className="mt-6">
        <Input
          value={location}
          onChange={onLocationChange}
          placeholder="Enter your city"
        />
        <Button onClick={handleSubmit} loading={loading}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
