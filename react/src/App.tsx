import React, { useState } from "react";
import "./App.css";
import { AnalyzeFacialData } from "./features/analyze/AnalyzeFacialData";
import { NavBar } from "./navbar/navbar";
import { AvailableFeatures } from "./types/Types";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaceFeatures } from "./features/verify/VerifyFacial";
import { FindFace } from "./features/finding_face_in_image/FindingFace";

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
      {currentSelectedFeature === "verify" && <FaceFeatures />}
      {currentSelectedFeature === "find" && <FindFace />}
    </div>
  );
}

export default App;
