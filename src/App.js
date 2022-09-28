import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
