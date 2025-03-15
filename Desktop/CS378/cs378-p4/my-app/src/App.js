import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [cities, setCities] = useState([
    { name: 'Austin', lat: 30.2672, lon: -97.7431 },
    { name: 'San Diego', lat: 32.7157, lon: -117.1611 },
    { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
  ]);
  const [weatherData, setWeatherData] = useState(null); 
  const [selectedCity, setSelectedCity] = useState('Austin'); 
  const [newCityName, setNewCityName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // fetch weather data using latitude and longitude
  const fetchWeather = async (lat, lon) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&temperature_unit=fahrenheit`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();

      // filter for the next 12 hours
      const currentTime = new Date();
      const next12Hours = data.hourly.time
        .map((time, index) => ({
          time,
          temperature: data.hourly.temperature_2m[index],
        }))
        .filter((entry) => new Date(entry.time) > currentTime && new Date(entry.time) <= new Date(currentTime.getTime() + 12 * 60 * 60 * 1000));

      return next12Hours;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

    // button click to display weather data
    const handleCityClick = async (city) => {
      setErrorMessage(''); 
      setSelectedCity(city.name);
      const weather = await fetchWeather(city.lat, city.lon);
      if (weather) {
        setWeatherData({ cityName: city.name, forecast: weather });
      } else {
        setErrorMessage(`Could not find weather for ${city.name}`);
      }
    };

  // fetch coordinates for a city name, geocoding
  const fetchCoordinates = async (cityName) => {
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch coordinates');
      const data = await response.json();
      return data.results?.[0]; 
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // add new city with text input
  const handleAddCity = async () => {
    setErrorMessage(''); 
    const coordinates = await fetchCoordinates(newCityName);
    if (coordinates) {
      const newCity = { name: newCityName, lat: coordinates.latitude, lon: coordinates.longitude };
      setCities([...cities, newCity]); // add new city to the list
      handleCityClick(newCity); // load and display weather data 
      setNewCityName('');
    } else {
      setErrorMessage(`Could not find coordinates for ${newCityName}`);
    }
  };

  //auto load austin data when app loads
  useEffect(() => {
    const defaultCity = cities.find((city) => city.name === 'Austin');
    handleCityClick(defaultCity);
  }, []);

  return (
    <div>
      <h1>Weather App</h1>

      {cities.map((city) => (
        <button key={city.name} onClick={() => handleCityClick(city)}
        style={{
          backgroundColor: selectedCity === city.name ? 'lightblue' : 'white',
          border: '1px solid black',
          padding: '5px',
          marginRight: '5px',
        }}
        >
          {city.name}
        </button>
      ))}

      <input 
        type="text" 
        value={newCityName} 
        onChange={(e) => setNewCityName(e.target.value)} 
        placeholder="Enter city name" 
      />
      <button onClick={handleAddCity}>+</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.cityName}</h2>
        {/* Line Chart Visualization */}
          <LineChart
            width={600}
            height={300}
            data={weatherData.forecast}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
            <YAxis label={{ value: "Temperature (°F)", angle: -90, position: "insideLeft" }} />
            <Tooltip labelFormatter={(time) => `Time: ${new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.forecast.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{entry.temperature}°F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
