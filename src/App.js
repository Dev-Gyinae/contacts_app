// import logo from './logo.svg';
import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ContactList from './components/contacts/ContactList/ContactList';
import './App.css';

let App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={"/"} />
        <Route path={"/contacts/list"} element={<ContactList/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;