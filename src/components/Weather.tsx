import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

const Weather: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "4f0211e4a121fe3cfc92fc65fb15aab8";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=es`;

  const searchLocation = async () => {
    try {
      const response: AxiosResponse<WeatherData> = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Ciudad no encontrada");
      setData(null);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await searchLocation();
    }
  };

  const getEmoticon = (temp: number): string => {
    if (temp >= -20 && temp <= 22) {
      return "❄️";
    } else if (temp > 22 && temp <= 29) {
      return "☀️";
    } else {
      return "🔥";
    }
  };

  const humidityEmoticon = (humidity: number): string => {
    if (humidity >= 0) {
      return "💧";
    } else return "🌫️";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full lg:w-2/3 bg-yellow-400 shadow-lg rounded-xl p-6 text-black">
        <p className="font-bold text-xl mb-4 text-center text-black ">
          El clima afecta la autonomía y eficiencia de un coche eléctrico debido
          a la variación en la capacidad de la batería y el aumento del consumo
          de energía por calefacción y aire acondicionado.
        </p>
        <p className="text-center font-bold">
          Comprueba el tiempo que hace en tu trayecto
        </p>
        {data && (
          <>
            <div className="border border-yellow-400 bg-black text-purple-900 p-4 mb-4 rounded-lg shadow-lg mt-4">
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Temperatura: {data.main.temp.toFixed(1)}°C{" "}
                {getEmoticon(data.main.temp)}
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Humedad: {data.main.humidity}%{" "}
                {humidityEmoticon(data.main.humidity)}
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Nubosidad: {data.clouds.all}%
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Velocidad del Viento: {data.wind.speed} m/s
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Dirección del Viento: {data.wind.deg}°
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Visibilidad: {data.visibility} metros
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Ciudad: {data.name}
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                País: {data.sys.country}
              </p>
              <p className="text-lg font-bold text-yellow-400 mb-2">
                Última Actualización:{" "}
                {new Date(data.dt * 1000).toLocaleTimeString()}
              </p>
            </div>
          </>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <div className="text-center mt-4">
          <div className="relative">
            <input
              type="text"
              className="py-3 px-6 text-lg rounded-3xl border border-gray-200 text-gray-300 placeholder:text-gray-400 focus:outline-none bg-black shadow-md w-full"
              placeholder="Introduce la ciudad"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
          <button
            className="py-3 px-6 bg-black text-white rounded-3xl mt-4 w-full lg:w-auto"
            onClick={searchLocation}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Weather;
