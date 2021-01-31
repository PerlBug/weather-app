export interface IMetaLocation {
  latt_long?: string;
  location_type?: string;
  title?: string;
  woeid?: number;
}

export interface IMetaForecast {
  air_pressure?: number;
  applicable_date?: string;
  created?: string;
  humidity?: number;
  id?: number;
  max_temp?: number;
  min_temp?: number;
  predictability?: number;
  the_temp?: number;
  visibility?: number;
  weather_state_abbr?: string;
  weather_state_name?: string;
  wind_direction?: number;
  wind_direction_compass?: string;
  wind_speed?: number;
}
