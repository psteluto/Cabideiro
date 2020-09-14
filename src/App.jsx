import React from 'react';
import Header from "./components/Header";
import Router from "./Router";
import Footer from "./components/Footer";
import {useDispatch} from "react-redux";
import {setToken as dispatchToken} from "./redux/TokenSlice";

const App = () => {
  const dispatch = useDispatch();
  dispatch(dispatchToken(localStorage.getItem("token")));

  return (
    <>
      <Header/>
      <Router/>
      <Footer/>
    </>
  )
}

export default App;