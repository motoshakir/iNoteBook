import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'

export const Imp = (props) => {
  const context = useContext(noteContext);
  let history =  useNavigate();
  const { notes, getNotes,editNote} = context;
  const [f,setf] = useState(true);
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()
    }
    else{
        props.showAlert("Please Login","danger");
        history("/login")
    }


    for(var i=0;i<notes.length;i++){
        if(notes[i].imp)
        {
            setf(false);
            break;
        }
        setf(true);
    }
    // eslint-disable-next-line 
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note,setNote] =useState({id:"",etitle:"",edescription:"",etag:"",eimp:false})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag,eimp:currentNote.imp})

  }

const handleClick = (e)=>{
  console.log("updating note", note);
  editNote(note.id,note.etitle,note.edescription,note.etag,note.eimp);
  refClose.current.click();
  props.showAlert("updated succcessfully","success");
   
}


  const onChange =(e)=>{
    setNote({...note,[e.target.name]: e.target.value})
}

  return (
    <div className="container">
      
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <h2>Add Note</h2>
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}  minLength={5} required/>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Important Notes</h2>
        <div className="container mx-2">
          { f && 'No important notes to display'}
        </div>
        {notes.sort((a, b) => a.date < b.date? 1 : -1)
               .map((note) => {
           if(note.imp)
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
        })}
      </div>

    </div>
  )
}
export default Imp;