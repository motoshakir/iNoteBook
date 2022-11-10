import React from 'react'
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const NavBar = () => {
    let history =  useNavigate();
    const {
        listening,
    } = useSpeechRecognition();

    const handleLogout = () =>{
        if(listening)
        SpeechRecognition.stopListening();

        localStorage.removeItem('token');
        localStorage.removeItem('name');
        history("/login")
    }
    let location = useLocation();

    useEffect(()=>{
        if(location.pathname !== '/voice' && listening)
        {
            SpeechRecognition.stopListening();
        }
    },[location.pathname,listening]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/notes'}?"active":""`} aria-current="page" to="/notes">All Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/addnote'}?"active":""`} to="/addnote">Add Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/important'}?"active":""`} to="/important">Importent</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/voice'}?"active":""`} to="/voice">Voice to Note</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about'}?"active":""`} to="/about">About</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" >
                           <Link className="btn btn-primary mx-1" to="/login" role="button">login</Link>
                           <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form>:<button onClick={handleLogout} className ="btn btn-primary">Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default NavBar;
