import React from 'react'
import { useState, useEffect, useRef, Fragment  } from 'react'
import Toastify from 'toastify-js';
import { weatherApiKey2, weatherApiUrl, weatherApiKey, weatherApiUrl2 } from '../services/WeatherApi';
import HourlyForecast from "./HourlyForecast";
import TempToggle from './TempToggle';
import SearchInput from './SearchInput';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import axios from 'axios';
import DailyForecast from './DailyForecast';
import { Tab } from '@headlessui/react';
import DateTime from './DateTime';

const WeatherApp = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const dropdownRef = useRef(null);
  const [unit, setUnit] = useState('metric'); 
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [ipAddress, setIPAddress] = useState('');

  useEffect(() => {
    axios.get('https://api.ipify.org?format=json')
      .then((response) => {
        const { ip } = response.data;
        setIPAddress(ip);
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  const handleSelect = (city) => {    
      setSelectedCity(city);
      setSearch('');
      setDropdownVisible(false);
      fetchWeatherData(city);
  };

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity, unit]);

  const fetchWeatherData = (city) => {
    setIsLoadingWeather(true); 

      const apiUrl = `${weatherApiUrl2}?q=${encodeURIComponent(city.name)}&days=3&aqi=no&alerts=no&key=${weatherApiKey2}`;
      
      fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoadingWeather(false);
      })
      .catch((error) => {
          console.error('Error fetching weather data:', error);
          setIsLoadingWeather(false); 
          Toastify({
              text: 'Error fetching weather data. City not found.',
              duration: 3000, 
              style: {
                background: 'white',
              },
              className: 'error-toast', 
            }).showToast();
      });
    };

  const fetchWeatherByIP = (cityName) => {

    const apiUrl = `${weatherApiUrl2}?q=${cityName}&days=3&aqi=no&alerts=no&key=${weatherApiKey2}`;
    fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      setWeatherData(data);
      setIsLoadingWeather(false);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      setIsLoadingWeather(false); 
      Toastify({
          text: 'Error fetching weather data. City not found.',
          duration: 3000, 
          style: {
            background: 'white',
          },
          className: 'error-toast', 
        }).showToast();
  });
  };
    
  useEffect(() => {
    async function CityLocation() {
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const data = await response.json();
      const cityInfo = data.city;
      return cityInfo;
    }

    CityLocation().then((cityName) => {
      fetchWeatherByIP(cityName);
        setSelectedCity({ name: cityName });
    });
  }, [weatherApiKey, weatherApiUrl]);


  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (weatherData && weatherData.current.is_day === 0) {
      body.style.backgroundColor = '#46218a';
    } else if (weatherData && weatherData.current.is_day === 1) {
      body.style.backgroundColor = '#35379c';
    }
  }, [weatherData]);
 
  return (
    <>
      {isLoadingWeather && (
        <div className="loader absolute sm:left-[1/2] left-[46%] top-1/3"></div>
      )}
      {weatherData && (
        <div>
          <div className={`day-${weatherData.current.is_day}`}>
            <div className={`container flex flex-col`}>
              <div className='top-bar '>
                <SearchInput
                    search={search}
                    onSearchInputChange={(value) => setSearch(value)}
                    isDropdownVisible={isDropdownVisible}
                    dropdownRef={dropdownRef}
                    setDropdownVisible={setDropdownVisible}
                    handleSelect={handleSelect}
                    onOutsideClick={() => setDropdownVisible(false)}
                />
                <TempToggle unit={unit} onUnitToggle={toggleUnit} />
                
              </div>

              {isLoadingWeather && (
                <div className="loader absolute top-1/3 sm:top-1/4"></div>
              )}

              {selectedCity && weatherData && (
              <>
              <div className={`mt-9 flex flex-col items-center gap-9 mb-6 ${isLoadingWeather ? ' opacity-10 transition-opacity' : ''}`}>
                <DateTime weatherData={weatherData} />
                <div className={`flex sm:flex-row flex-col items-center sm:items-start sm:gap-16 gap-8 transition-all`}>
                
                    <CurrentWeatherDetails weatherData={weatherData} unit={unit}/>
                    <div className="flex flex-col gap-6">
                      <Tab.Group>
                        <Tab.List>
                          <div className="flex tabs items-center gap-6 justify-center sm:justify-start">
                              <Tab as={Fragment}>
                                {({ selected }) => (
                                  <button
                                    className={`transition ease-in-out 
                                      ${selected ? ' border-none outline-none underline underline-offset-8 decoration-2 decoration-[#ffffff80] rounded-full' : 'text-[#ffffff9f]'}
                                    `}
                                  >
                                    Hourly
                                  </button>
                                )}
                              </Tab>
                              <Tab as={Fragment}>
                                {({ selected }) => (
                                  <button
                                    className={`transition ease-in-out
                                      ${selected ? ' border-none underline decoration-2 decoration-[#ffffff80] underline-offset-8 outline-none rounded-full' : 'text-[#ffffff9f]'}
                                    `}
                                  >
                                    Daily
                                  </button>
                                )}
                              </Tab>
                          </div>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                              <HourlyForecast weatherData={weatherData} unit={unit}/>
                            </Tab.Panel>
                            <Tab.Panel>
                              <DailyForecast weatherData={weatherData} unit={unit}/>
                            </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                 </div>

                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
    
  
  )
}

export default WeatherApp