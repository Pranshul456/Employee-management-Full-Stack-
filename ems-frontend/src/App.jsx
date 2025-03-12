import { useState } from "react";
import "./App.css";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import EmployeComponent from "./components/EmployeComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}/>
          <Route path="/employees" element={<ListEmployeeComponent />}/>
          <Route path="/add-employee" element={<EmployeComponent />}/>
          <Route path="/update-employee/:id" element={<EmployeComponent />}/>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
