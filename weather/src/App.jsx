import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import './index.css'

const App = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (city) => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_WEATHER_API_KEY
        }`
      )
      setWeatherData(response.data)
    } catch (err) {
      setError('City not found. Please try another location.')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p className="loading">Loading weather data...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  )
}

export default App