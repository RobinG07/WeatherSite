import React from "react";

const Weather = ({icon, weather}) => {
    return (
        <div className="App">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <h3>{console.log(weather)}</h3>
       </div>
    )
}

export default Weather;