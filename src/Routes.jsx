import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ButtonExample from "./pages/components/Loader";
import "./pages/All.css"

const RoutesFile = () => {
  const state = useSelector((state) => state);
  if (state.loading)
    return (
      <>
        <div className="mainDivSignUp">
          <ButtonExample />
        </div>
      </>
    );
  return (
    <>
      <BrowserRouter>
        {state.uid ? (
          <Routes>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="*" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LogIn />}></Route>
            <Route path="*" element={<LogIn />} />
            <Route path="/SignUp" element={<SignUp />}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default RoutesFile;
