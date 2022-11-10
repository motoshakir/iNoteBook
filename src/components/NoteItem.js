import React, { useContext } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';

import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { note, updateNote } = props;
    const { deleteNote,editNote} = context;
    const { speak, cancel, speaking, voices } = useSpeechSynthesis()

    const fun1 = (()=>{
        if(!speaking)
        speak({text : "  "+note.description, voice: voices[1]})
        else
        cancel();
      })

    
    const fun = ()=>{
        console.log(note.imp);

        if(note.imp)
        note.imp=false
        else
        note.imp=true;

        
        editNote(note._id,note.title,note.description,note.tag,note.imp)

        console.log(note.imp);
    }



    return (

        <div className="col-md-6 ">
            <div className="card my-3">
           
            
                    <div class=" card-header d-flex justify-content-between bg-warning p-2 text-dark bg-opacity-10">
                        <div >
                            <h5 className="card-title ">{note.title}</h5>
                        </div>
                        <div >
                            <p className="card-text "> {note?.date.substr(0, 10)}</p>
                        </div>
                    </div>
                



                <div className="card-body" >
                    <p className="card-text"> {note.description}</p>
                </div>


                {/* <p>{moment.unix(note.date).format("MMMM Do YYYY, h:mma")}</p> */}
                <div className="d-flex align-items-center justify-content-between card-footer ">

                       
                    
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted succcessfully", "success"); }}></i>
                    <i className="fa-solid fa-file-pen mx-2" onClick={() => { updateNote(note); }}></i>
                    <div onClick={fun1}>
                    <i class="fa-solid fa-volume-high"></i>
                    </div>
                    <div onClick={fun}>
                       { note.imp ? <i class="fa fa-light fa-star"></i>:<i class="fa-regular fa-star"></i>  }
                    </div>
                    
                </div>
 

            </div>
        </div>

    )
}

export default NoteItem;