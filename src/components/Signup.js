import { useState } from "react"
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials,setCredentials] = useState({name:"",email:"",password: "",cpassword:""})
    let history =  useNavigate();
    
    const handleSubmit = async (e)=>{
       e.preventDefault();
       const {name,email,password} = credentials;
       const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
        
       method : 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
      console.log(json);
       if(json.success){
         //save the auth token redirect
         localStorage.setItem('token',json.authtoken);
         localStorage.setItem('name',json.name);
         
         props.showAlert("Account created Successfully","success");

         history("/addnote");
       }
       else{
        props.showAlert("Invalid Credential","danger");
       }
    
    }

    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="container mt-2">
        <h2 className="my-2">Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} id="name" name="name"  onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  value={credentials.password} id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"  value={credentials.cpassword} id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup