// import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import AddNote from './components/AddNote';
import Imp from './components/Imp';
import Voice from './components/Voice';
import YourNotes from './components/YourNotes';



function App() {
  const [alert,setAlert] =  useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <NavBar/>
        <Routes>
        <Route exact path="/" element={<Home/>} />
        </Routes>
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
           
           <Route exact path="/notes" element={<YourNotes showAlert={showAlert} />} />
           <Route exact path="/addnote" element={<AddNote showAlert={showAlert} />} />
           <Route exact path="/important" element={<Imp showAlert={showAlert} />} />
           <Route exact path="/voice" element={<Voice showAlert={showAlert} />} />
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
        </BrowserRouter>
        </NoteState>
    </>
  );
}

export default App;
