/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";

import Home from "@/pages/index";


function App() {
  return (
    <Routes>
      <Route element={<Home/>} path="/" />
    </Routes>
  );
}

export default App;
