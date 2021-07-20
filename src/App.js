import './App.css';
import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
 
let defaults = {
  icon: 'CLEAR_DAY',
  color: 'white',
  size: 100,
  animate: true
};

let iconMap = new Map();
iconMap.set('01d', 'CLEAR_DAY');
iconMap.set('01n', 'CLEAR_NIGHT');
iconMap.set('02d', 'PARTLY_CLOUDY_DAY');
iconMap.set('02n', 'PARTLY_CLOUDY_NIGHT');
iconMap.set('03d', 'CLOUDY');
iconMap.set('03n', 'CLOUDY');
iconMap.set('04d', 'CLOUDY');
iconMap.set('04n', 'CLOUDY');
iconMap.set('09d', 'RAIN');
iconMap.set('09n', 'RAIN');
iconMap.set('10d', 'RAIN');
iconMap.set('10n', 'RAIN');
iconMap.set('11d', 'RAIN');
iconMap.set('11n', 'RAIN');
iconMap.set('13d', 'SNOW');
iconMap.set('13n', 'SNOW');
iconMap.set('50d', 'FOG');
iconMap.set('50n', 'FOG');

/*const sampleRes = {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
};*/                    


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      weatherData: null,
      appError: null,
      latitude: null,
      longitude: null
    };
  }

  componentDidMount(){
    this.getLocation();
    setInterval(() => {
      this.fetchData();
    }, 250000);
  }

  getLocation = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  setPosition = (position) =>{
    this.setState({latitude: position.coords.latitude}); 
    this.setState({longitude: position.coords.longitude});
    this.fetchData();
  }
// (`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${APIKey}&units=metric`)
  fetchData = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${process.env.REACT_APP_SECRET_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if(data.weather){
      this.setState({weatherData: data});
      } else{
        this.setState({appError: data});
      }
    })
    .catch(err => console.log(err))
  }

  isDay = () =>{
    if(this.state.weatherData.weather[0].icon.slice(-1) === 'd'){
      defaults.color = 'black';
      return true;
    } else {
      defaults.color = 'white';
      return false;
    }
  }


  render(){
    const weatherData = this.state.weatherData;

    if(this.state.appError){
      return <h1>Failed to load weather data.</h1>
    }

    if (!weatherData){
      return <></>
    }else{
      return (
      <div className={'App ' + (this.isDay() ? '' : 'night')}>
        <ReactAnimatedWeather
            icon={iconMap.get(weatherData.weather[0].icon)}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        <div>
          <h3>{Math.round(weatherData.main.temp)} °C</h3>
          <h3>{weatherData.weather[0].main}</h3>
        </div>
      </div>
      );
    }
  }
}

//     <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
export default App;
