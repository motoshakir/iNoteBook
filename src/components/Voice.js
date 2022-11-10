import React, { useEffect, useState, useContext} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'

const Voice = (props) => {

    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition();
    const context = useContext(noteContext);
    const {addNote} = context;
    let history =  useNavigate();

    const [note,setNote] =useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
           e.preventDefault();

           SpeechRecognition.stopListening();

           addNote(note.title,finalTranscript,note.tag);
           setNote({title:"",description:"",tag:""})
           resetTranscript();
           props.showAlert("Added succcessfully","success");
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    useEffect(() => {
        if(!localStorage.getItem('token')){
        props.showAlert("Please Login","danger");
          history("/login")
        }
        // eslint-disable-next-line 
      }, [])

    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
    };
    return (
        <div>
            <div className='container' >
                <div className=' mb-3 mx-2 fs-5'>
                    listening:
                    {' '}
                    {listening ? <i class="fa-solid fa-microphone"></i> : <i class="fa-solid fa-microphone-slash"></i>}
                </div>
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={resetTranscript}>Reset</button>
                    <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={listenContinuously}>Listen</button>
                    <button type="button" className="btn btn-secondary btn-sm mx-2" onClick={SpeechRecognition.stopListening}>Stop</button>
                </div>
            </div>

            <div className="container my-3">
                <h2>Voice to note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        {/* <input type="text" className="form-control" id="description" name="description" value={transcript}  /> */}
                        <textarea class="form-control" aria-label="With textarea" value={transcript} minLength={5} required rows="6"></textarea> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                    </div>

                    <button disabled={note.title.length < 5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>

            {/* <div>
                <span></span>
            </div> */}
        </div>
    );
};

export default Voice;
