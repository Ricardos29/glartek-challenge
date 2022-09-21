import React, {useEffect, useState} from 'react';

function Temperature() {
    const [temp, setTemp] = useState([]);
    const [location, setLocation] = useState('2267056'); // First location

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
    ]
 
    const fetchTemperature = async() => { // GET temperature from backend
        const data = await fetch(`/temperature/${location}`);
        const temp = await data.json();
        setTemp(temp);
    }
    
    useEffect(() => { // Call fetchTemperature when start app
        fetchTemperature();
    }, []);

    setInterval(fetchTemperature, 1800000); // Call fetchTemperature 30 in 30 minutes

    const changeLocation = async (value) => { // Get temperature from backend of another location
        setLocation(value);
        const data = await fetch(`/temperature/${value}`)
        const temp = await data.json();

        setTemp(temp);
    }

    return (
        <div className="grid-container h-100">
            
            <div className="grid-item-left">
                <section>
                    {
                        temp && temp.main && temp.main.temp && // IF statement
                        <p>{(temp.main.temp - 273.15).toFixed(2)}º</p>
                    }

                    {
                        temp && temp.name && // IF statement
                        <p>{temp.name}</p>
                    }

                    {
                        temp && temp.weather && temp.weather[0].main &&// IF statement
                        <p>{temp.weather[0].main}</p>
                    }

                </section>
            </div>

            <div className="grid-item-right">
                <form>
                    <select value={location} onChange={(e) => changeLocation(e.target.value)}>
                        {locations.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </form>

                    <p>{ location }</p>

                    <section className="items-box">
                
                        <div className="d-grid">
                            <div className="d-grid-1-3">
                                <p className="text-left">Temp. Felt</p>
                            </div>
                            <div className="d-grid-3">
                                {
                                    temp && temp.main && temp.main.feels_like && // IF statement
                                    <p className="text-right">{(temp.main.feels_like - 273.15).toFixed(2)}º</p>
                                }
                            </div>
                        </div>

                        <div className="d-grid">
                            <div className="d-grid-1-3">
                                <p className="text-left">Temp. Minimum</p>
                            </div>
                            <div className="d-grid-3">                        
                                {
                                    temp && temp.main && temp.main.temp_min && // IF statement
                                    <p className="text-right">{(temp.main.temp_min - 273.15).toFixed(2)}º</p>
                                }
                            </div>
                        </div>


                        <div className="d-grid">
                            <div className="d-grid-1-3">
                                <p className="text-left">Temp. Maximum</p>
                            </div>
                            <div className="d-grid-3">
                                {
                                    temp && temp.main && temp.main.temp_max && // IF statement
                                    <p className="text-right">{(temp.main.temp_max - 273.15).toFixed(2)}º</p>
                                }
                            </div>
                        </div>

                        <div className="d-grid">
                            <div className="d-grid-1-3">
                                <p className="text-left">Pressure</p>
                            </div>
                            <div className="d-grid-3">
                                {
                                    temp && temp.main && temp.main.pressure && // IF statement
                                    <p className="text-right">{temp.main.pressure}Pa</p>
                                }
                            </div>
                        </div>

                        <div className="d-grid">
                            <div className="d-grid-1-3">
                                <p className="text-left">Humidity</p>
                            </div>
                            <div className="d-grid-3">
                                {
                                    temp && temp.main && temp.main.humidity && // IF statement
                                    <p className="text-right">{temp.main.humidity}%</p>
                                }
                            </div>
                        </div>

                        <div className="d-grid">
                            <div className="d-grid-1-3">
                                <p className="text-left">Wind</p>
                            </div>
                            <div className="d-grid-3">
                                {
                                    temp && temp.wind && temp.wind.speed && // IF statement
                                    <p className="text-right">{temp.wind.speed}km/h</p>
                                }
                            </div>
                        </div>
                </section>

            </div>
        </div>
    );
}

export default Temperature;