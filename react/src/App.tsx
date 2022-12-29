import React from "react";
import "./App.css";
import { AnalyzeFacialData } from "./AnalyzeFacialData";
import { FaceFeatures } from "./VerifyFacial";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <AnalyzeFacialData /> */}
        <FaceFeatures />
      </header>
    </div>
  );
}

export default App;