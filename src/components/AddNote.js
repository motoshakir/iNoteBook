import React,{useContext,useState,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    let history =  useNavigate();

    const [note,setNote] =useState({title:"",description:"",tag:""})

    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.showAlert("Please Login","danger");
          history("/login")
        }
        
        // eslint-disable-next-line 
      }, [])

    
    const handleClick = (e)=>{
           e.preventDefault();
           addNote(note.title,note.description,note.tag);
           setNote({title:"",description:"",tag:""})
           props.showAlert("Added succcessfully","success");
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    {/* <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/> */}
                    <textarea class="form-control" id="description" name="description" value={note.description} onChange={onChange} aria-label="With textarea" minLength={5} required rows="6"></textarea> 
                </div>
                <div className="mb-3">
                    <label htmlFor="Tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;