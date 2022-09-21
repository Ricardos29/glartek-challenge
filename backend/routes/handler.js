const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const nodecache = require('node-cache');

const appCache = new nodecache({stdTTL: 3599, checkperiod: 1800});
const API_KEY = '4b0bda5bac2c84b7ab2705bbb0d1c739';
const cities = [
    {
        'id': '2267056', 
        'name': 'Lisboa',
        'data' : []
    }, 
    {
        'id': '2267094', 
        'name': 'Leiria',
        'data' : []
    }, 
    {
        'id': '2740636', 
        'name': 'Coimbra',
        'data' : []
    }, 
    {
        'id': '2735941', 
        'name': 'Porto',
        'data' : []
    }, 
    {
        'id': '2268337', 
        'name': 'Faro',
        'data' : []
    }, 
]

// GET temperature
router.get('/temperature/:location', (req, res) => {
    if(appCache.has(req.params.location)) // Get temperature from Node Cache
    {
        console.log("Get temperature from Node Cache");
        return res.send(appCache.get(req.params.location));
    }
    else
    {
        const url = `http://api.openweathermap.org/data/2.5/weather?id=${req.params.location}&APPID=${API_KEY}`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            appCache.set(req.params.location, data)
            res.send(data)
        });
    }
});

router.get('/stats', (req, res) => {
    res.send(appCache.getStats());
});

module.exports = router;

// router.get('/temperatures/all', async (req, res ) => {

//     const temp = await cities.forEach(city => {
//         const url = `http://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=${API_KEY}`;
        
//         fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             city.name = 'ola';
//             console.log(city.name)
//         })
//     });

//     res.end(JSON.stringify(cities));
    
// })