import React, { useState } from "react";
import "./App.css";
import { ImageDisplay } from "./features/picturePicker/ImageDisplay";
import { AnalyzeFacialData } from "./features/analyze/AnalyzeFacialData";
import { NavBar } from "./navbar/navbar";
import { AvailableFeatures } from "./types/Types";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaceFeatures } from "./features/verify/VerifyFacial";

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
      <ImageDisplay />

      {currentSelectedFeature === "analyze" && <AnalyzeFacialData />}
      {currentSelectedFeature === "verify" && <FaceFeatures />}
    </div>
  );
}

export default App;
