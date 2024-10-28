import React from 'react';
import TeamMember from './pages/About Us.js';
import NavBar from './components/navbar.js';              // Import NavBar component
import WeatherHomePage from './pages/Home.js'; // Import WeatherHomePage component 
import Footer from './components/footer.js';              // Import Footer component
import logo from './logo.svg';              // Assuming you have a logo in your src folder
import './App.css';                         // Optional: Import global CSS (if any)

function App() {
  return (
    <div className="App">
      {/* Render the NavBar at the top */}
      <NavBar />

      {/* Existing header content */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Render the main content (weather information) */}
      <WeatherHomePage />

      {/* Render the main content (weather information) */}
      <TeamMember />

      {/* Render the Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
