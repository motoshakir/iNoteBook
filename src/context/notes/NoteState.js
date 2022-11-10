import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host ="http://localhost:5000"

  const notesInitial = []
  const[notes,setNote] = useState(notesInitial)
  // get all node
  const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallNote` ,{
      method : 'GET',
      headers: {
        'content-Type': 'application/json',
       "author-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()

   setNote(json)
  }

  //Add a Note
  const addNote = async (title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`,{
      method : 'POST',
      headers: {
        'content-Type': 'application/json',
        "author-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    })
  
    const note = await response.json();
   setNote(notes.concat(note))
  }
  //Delete a Note
  const deleteNote = async (id)=>{
    
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method : 'DELETE',
      headers: {
        'content-Type': 'application/json',
       "author-token": localStorage.getItem('token')
      },
    })
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note)=>{return note._id!==id})
    setNote(newNote);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag , imp)=>{
   
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method : 'PUT',
      headers: {
        'content-Type': 'application/json',
       "author-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag,imp})
    })
    const json = await response.json();
    console.log(json);

    
    let nowNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < nowNotes.length; index++) {
      const element = nowNotes[index];
      if(element._id === id){
        nowNotes[index].title = title;
        nowNotes[index].description = description;
        nowNotes[index].tag = tag;
        nowNotes[index].imp = imp;

        break;
      }
    }
    console.log(nowNotes);
    setNote(nowNotes);
  }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;   