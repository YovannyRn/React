import React from "react";
// Update the import path to the correct relative location
import Authmiddleware from "./routes/Authmiddleware";
import LoadingScreen from "./components/common/LoadingScreen";

const App = () => {
  return (
    <>
      <LoadingScreen />
      <Authmiddleware />
    </>
  );
};

export default App;
