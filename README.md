# Glartek Challenge
# Description
- App that displays weather conditions captured by OpenWeatherMap API. Divided between backend and frontend. Backend gets data from OpenWeatherMap API and sends to frontend. Frontend guarantees that weather conditions and location are displayed on the page.
# Backend
- To run backend: npm run server (execute on terminal on backend folder)
- Routes: /temperature/{location}
- Possible locations: 
  - 2267056 (Lisboa)
  - 2267094 (Leiria)
  - 2740636 (Coimbra)
  - 2735941 (Porto)
  - 2268337 (Faro)
  - ...
  
- To try an invalid location: /temperature/invalid

# Frontend
- To run frontend: npm start (execute on terminal on frontend folder)
- List of locations available: 
  - Lisboa (2267056)
  - Leiria (2267094)
  - Coimbra (2740636)
  - Porto (2735941)
  - Faro (2268337)
  - invalid (invalid)

# Important !
- Make sure to run backend before frontend or data won't be displayed on page at first time!
