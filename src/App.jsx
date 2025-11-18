import React from "react";
import { Routes, Route } from "react-router-dom";
import Portfolio2 from "./Portfolio2";
import Portfolio from "./Portfolio";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/portfolio" element={<Portfolio2 />} />
    </Routes>
  );
};

export default App;
