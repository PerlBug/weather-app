import React from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Axios from "axios";
import { IMetaForecast, IMetaLocation } from "./types/metaWeather";
import { useToasts } from "react-toast-notifications";
import WeatherDisplay from "./components/WeatherDisplay";



function App() {
  const { addToast } = useToasts(); //hook for using react toast

  const [location, setLocation] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  //this will hold the data returned from the location search API
  const [locationResults, setLocationResults] = React.useState<IMetaLocation[]>(
    []
  );
  //this contains the selected city
  const [selectedCity, setSelectedCity] = React.useState<IMetaLocation>({});

  //this holds forecast for selected location
  const [forecast, setForecast] = React.useState<IMetaForecast[]>([]);


  React.useEffect(()=>{
    if ("geolocation" in navigator) {
      getClientLocation();
    }
  },[])

  //prompts user to get their coordinates
  function getClientLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
      if(position?.coords?.latitude){
        const {latitude, longitude} = position?.coords;
        fetchLocationWithCoordinates(latitude, longitude);
      }
    });
  }

  async function fetchLocationWithCoordinates(lat: number, lng: number){
    try {
      setLoading(true);
      //we are using CORS Anywhere proxy to bypass the CORS problem for now
      //ideally we would route this through our own API service
      const data: IMetaLocation[] = (
        await Axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`
        )
      ).data;
      //if locations returned, display error
      if(data[0]?.latt_long){
        handleCitySelect(data[0]);
      }
      setLoading(false);
     // setLocationResults(data);
    } catch (err) {
      setLoading(false);
      errorToast(err.toString());
      throw err;
    }
  }

  //clears all state
  function clearLocationState() {
    setForecast([]);
    setLocationResults([]);
    setSelectedCity({});
    setLoading(false);
  }

  function onLocationChange(e: any) {
    setLocation(e.target.value);
  }

  function handleSubmit() {
    clearLocationState();
    //if no location, we return and toast error
    if (!location) return errorToast("Please enter a city");

    fetchLocationData(location);
  }

  //renders an error toast on the screen
  function errorToast(msg: string) {
    addToast(msg, {
      appearance: "error",
      autoDismiss: true,
    });
  }

  //fetch forecast data for given location
  async function fetchWeatherData(l: IMetaLocation) {
    try {
      const data: any = (
        await Axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${l.woeid}`
        )
      ).data;
      if (data?.consolidated_weather?.length) {
        setForecast(data.consolidated_weather.slice(0, 4));
      }
    } catch (err) {
      errorToast(err.toString());
      throw err;
    }
  }

  //will fetch the location data and set it to local state
  async function fetchLocationData(location: string) {
    try {
      setLoading(true);
      //we are using CORS Anywhere proxy to bypass the CORS problem for now
      //ideally we would route this through our own API service
      const data: IMetaLocation[] = (
        await Axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
        )
      ).data;
      //if locations returned, display error
      if (!data || !data.length) {
        errorToast("City not found. Please try again.");
      } else if (data.length === 1) {
        //if there is only 1 city, we set the selected city to this one
        handleCitySelect(data[0]);
      }
      setLoading(false);
      setLocationResults(data);
    } catch (err) {
      setLoading(false);
      errorToast(err.toString());
      throw err;
    }
  }

  function handleCitySelect(l: IMetaLocation) {
    setSelectedCity(l);
    fetchWeatherData(l); //fetch forecast data for this city
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
      <div className="mt-3">
        {/* Once the city has been selected, display it here */}
        {selectedCity?.title && (
          <div className="text-center">
            <h3 className="text-lg">
              Showing forecast for {selectedCity?.title}
            </h3>
          </div>
        )}
        {/* If more than one city has been found, we ask the user which one they want to select */}
        {locationResults.length > 1 && !selectedCity?.title && (
          <div className="flex flex-col items-center">
            <h3 className="text-lg">
              More than 1 city was found. Please select desired option.
            </h3>
            <div className="mt-5">
              {locationResults.map((l, idx) => (
                <div
                  key={l.woeid}
                  className="shadow-sm border-white border p-2 m-2 cursor-pointer hover:bg-red-700"
                  onClick={() => handleCitySelect(l)}
                >
                  {l.title} {l.latt_long}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Forecast display */}
        <div className="flex flex-row mt-6">
          {forecast.map((f, idx) => (
            <div>
              <WeatherDisplay
                abbr={f.weather_state_abbr}
                date={f.applicable_date}
                desc={f.weather_state_name}
                key={f.id + idx.toString()}
                maxTemp={Math.round(f.max_temp || 0)}
                minTemp={Math.round(f.min_temp || 0)}
                windSpeed={Math.round(f.wind_speed || 0)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
