import React, { useState } from "react";
import "./App.css";
import { AnalyzeFacialData } from "./AnalyzeFacialData";
import { NavBar } from "./navbar/navbar";
import { AvailableFeatures } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentSelectedFeature, setCurrentSelectedFeature] =
    useState<AvailableFeatures>("home");

  const handleFeatureChange = (selectedFeature: AvailableFeatures): void => {
    setCurrentSelectedFeature(selectedFeature);
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar
          currentSelectedFeature={currentSelectedFeature}
          handleFeatureChange={handleFeatureChange}
        />
      </header>
      {currentSelectedFeature === "analyze" && <AnalyzeFacialData />}
    </div>
  );
}

export default App;
