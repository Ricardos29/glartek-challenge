import React, {useEffect, useState, useLayoutEffect} from 'react';

function Temperature() {
    const [temp, setTemp] = useState([]);
    const [location, setLocation] = useState('2267056'); // First location
    const [bg, setBg] = useState('');
    const [error, setError] = useState('');

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug","Sep","Oct","Nov","Dec"];

    const images = {};
    images['Clear'] = { 'bg': './img/clear-bg.jpg' };
    images['Clouds'] = { 'bg': './img/clouds-bg.jpg' };
    images['Rain'] = { 'bg': './img/rain-bg.jpg' };
    images['Thunderstorm'] = { 'bg': './img/strom-bg.jpg' };
    images['Other'] = { 'bg': './img/clear-bg.jpg' };

    const current = new Date();
    const currentDate = `${current.getHours()}:${current.getMinutes()} - ${weekday[current.getDay()]},  ${current.getDate()} ${month[current.getMonth()]} ${current.getFullYear()}`;

    // List of locations
    const locations = [
        {
            'value': '2267056', 
            'label': 'Lisboa',
        }, 
        {
            'value': '2267094', 
            'label': 'Leiria',
        }, 
        {
            'value': '2740636', 
            'label': 'Coimbra',
        }, 
        {
            'value': '2735941', 
            'label': 'Porto',
        }, 
        {
            'value': '2268337', 
            'label': 'Faro',
        },
        {
            'value': 'invalid', 
            'label': 'Invalid',
        },
    ]
    
    useLayoutEffect(() => { // Call fetchTemperature when start app
        changeLocation(location);
    }, []);

    useEffect(() => { // Call fetchTemperature when start app
        const interval = setInterval(() => {
            changeLocation(location);
        }, 1800000);

        return () => clearInterval(interval); // Call fetchTemperature 30 in 30 minutes
    }, [location]);

    const changeLocation = async (value) => { // Get temperature from backend of another location
        setError(null) // Error to null
        setLocation(value);
        const data = await fetch(`/temperature/${value}`)
        const temperature = await data.json();
        if(temperature.cod === 200){
            setTemp(temperature); // Set temp
            if(images[temperature.weather[0].main]) {
                setBg(images[temperature.weather[0].main]['bg']);
            } 
            else {
                setBg(images['Other']['bg']);
            }
        } 
        else {
            errorHandler(temperature);
        }
    }

    const errorHandler = (temperature) => {
        setBg('./img/something_went_wrong.jpg');
        setError(temperature); // Error to temp with error code and message
        setTemp(null); // Temp to null
    }

    return (
        <div className="grid-container h-100" style={{ backgroundImage: "url(" + bg + ")"}}>
            <div className="grid-item-left d-flex">
                { temp &&
                    <section className="mt-auto mb-50px w-100">
                        <div className="row align-center">
                            <div className="col-bigger">
                                {
                                    temp.main && temp.main.temp && // IF statement
                                    <p className="text-right temp">{(temp.main.temp - 273.15).toFixed(0)}º</p>
                                }
                            </div>

                            <div className="col-bigger">
                                {
                                    
                                    temp.name && // IF statement
                                    <p className="city">{temp.name}</p>
                                }
                                <p className="date">{currentDate}</p>
                            </div>

                            <div className="col-bigger text-left">
                                {
                                    temp.weather && temp.weather[0].icon &&// IF statement
                                    <img alt="Weather condition icon" className="w-100px" src={'http://openweathermap.org/img/wn/' + temp.weather[0].icon + '@2x.png'} />
                                }
                                {
                                    temp.weather && temp.weather[0].main &&// IF statement
                                    <p className="text-left state">{temp.weather[0].main}</p>
                                }
                            </div>
                        </div>

                    </section>
                }   
            </div>

            <div className="grid-item-right">
                <div className="items-box">
                    <select value={location} onChange={(e) => changeLocation(e.target.value)}>
                        {locations.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <hr className="hr"></hr>
                </div>

                { error && 
                    <section className="items-box">
                        <p className="bold text-left mb-40px">Error</p>
                        <p className="text-left">Error: {error.cod}</p>
                        <p className="text-left">Message: {error.message}</p>            
                    </section>
                }

                { temp &&
                <section className="items-box mt-auto mb-50px">
                    <hr className="hr"></hr>
                        
                    <p className="bold text-left mb-40px">Weather Details</p>

                    <div className="d-grid">
                        <div className="d-grid-1-3">
                            <p className="text-left fw-400">Felt</p>
                        </div>
                        <div className="d-grid-3">
                            {
                                temp && temp.main && temp.main.feels_like && // IF statement
                                <p className="text-right fw-400">{(temp.main.feels_like - 273.15).toFixed(2)}º</p>
                            }
                        </div>
                    </div>

                    <div className="d-grid">
                        <div className="d-grid-1-3">
                            <p className="text-left fw-400">Minimum</p>
                        </div>
                        <div className="d-grid-3">                        
                            {
                                temp && temp.main && temp.main.temp_min && // IF statement
                                <p className="text-right fw-400">{(temp.main.temp_min - 273.15).toFixed(2)}º</p>
                            }
                        </div>
                    </div>


                    <div className="d-grid">
                        <div className="d-grid-1-3">
                            <p className="text-left fw-400">Maximum</p>
                        </div>
                        <div className="d-grid-3">
                            {
                                temp && temp.main && temp.main.temp_max && // IF statement
                                <p className="text-right fw-400">{(temp.main.temp_max - 273.15).toFixed(2)}º</p>
                            }
                        </div>
                    </div>

                    <div className="d-grid">
                        <div className="d-grid-1-3">
                            <p className="text-left fw-400">Pressure</p>
                        </div>
                        <div className="d-grid-3">
                            {
                                temp && temp.main && temp.main.pressure && // IF statement
                                <p className="text-right fw-400">{temp.main.pressure}Pa</p>
                            }
                        </div>
                    </div>

                    <div className="d-grid">
                        <div className="d-grid-1-3">
                            <p className="text-left fw-400">Humidity</p>
                        </div>
                        <div className="d-grid-3">
                            {
                                temp && temp.main && temp.main.humidity && // IF statement
                                <p className="text-right fw-400">{temp.main.humidity}%</p>
                            }
                        </div>
                    </div>

                    <div className="d-grid">
                        <div className="d-grid-1-3">
                            <p className="text-left fw-400">Wind</p>
                        </div>
                        <div className="d-grid-3">
                            {
                                temp && temp.wind && temp.wind.speed && // IF statement
                                <p className="text-right fw-400">{temp.wind.speed}km/h</p>
                            }
                        </div>
                    </div>
                </section>
                }
            </div>
        </div>
    );
}

export default Temperature;