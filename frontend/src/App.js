import './App.css';
import Nav from './components/Nav'; // Import Nav from Nav.js
import Temperature from './components/Temperature'; // Import Temperature from Temperature.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" />
            <Route path="/temperature" element={<Temperature />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
