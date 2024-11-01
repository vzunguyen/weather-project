import React from "react";
import NavBar from "./components/NavBar.js"; // Import NavBar component
import WeatherHomePage from "./pages/Home.js"; // Import WeatherHomePage component
import TeamMember from "./pages/About Us.js";
import Charts from "./pages/Models.js";
import Footer from "./components/Footer.js"; // Import Footer component
import logo from "./logo.svg"; // Assuming you have a logo in your src folder
import "./App.css"; // Optional: Import global CSS (if any)

function App() {
  return (
    <div className="App">
      {/* Render the NavBar at the top */}
      <NavBar />

      {/* Render the main content (weather information) */}
      <WeatherHomePage />

      {/* Render the main content (weather information) */}
      <TeamMember />

      {/* Render the main content (weather information) */}
      <Charts />

      {/* Render the Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
