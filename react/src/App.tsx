import React from "react";
import "./App.css";
import FirstComponent from "./components /imagedisplay";
import { AnalyzeFacialData } from "./AnalyzeFacialData";

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <FirstComponent />
      <header className="App-header">
        <AnalyzeFacialData />
      </header>
    </div>
  );
}

export default App;
