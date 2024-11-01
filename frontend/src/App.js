import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js"; // Import Header component
import HomePage from "./pages/Home.js"; // Import WeatherHomePage component
import AboutUs from "./pages/AboutUs.js";
import ModelsPage from "./pages/Models.js";
import Footer from "./components/Footer.js"; // Import Footer component
import "./App.css"; // Optional: Import global CSS (if any)

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/models" element={<ModelsPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
