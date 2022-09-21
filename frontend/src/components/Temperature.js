import React, {useEffect, useState} from 'react';

function Temperature() {
    const [temp, setTemp] = useState([]);
    const [location, setLocation] = useState('2267056');

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
 
    const fetchTemperature = async() => {
        const data = await fetch(`/temperature/${location}`);
        const temp = await data.json();
        setTemp(temp);
    }
    
    useEffect(() => {
        fetchTemperature();
    }, []);

    const changeLocation = async (value) => {
        setLocation(value);
        const data = await fetch(`/temperature/${value}`)
        const temp = await data.json();
        setTemp(temp);
    }

    return (
        <div>
            <form>
                <select value={location} onChange={(e) => changeLocation(e.target.value)}>
                    {locations.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <p>{ location }</p>

            </form>

            <section>
                {
                    temp.clouds &&
                    <p>{temp.clouds.all}</p>
                }
            </section>
        </div>
    );
}

export default Temperature;