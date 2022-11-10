import './Home.css'
import { useState,useEffect } from 'react';
import pic from "./pic_1.jpg";



export const Home = () => {
  const [name,setName] = useState("User")
  const [log,setLog] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('name')){
       setName(localStorage.getItem('name'));
       setLog(true);
    }
    else
       {
        setLog(false);
        setName("User");
       }

    // eslint-disable-next-line 
  }, [])

  return (
    <div
        className="bg_image"
        style={{
          backgroundImage: `url(${pic})`,
          backgroundSize: "cover",
          height: "100vh",
          backgroundRepeat: 'no-repeat',
          position: "static",
          color: "#f5f5f5"
        }}
        
      >
<div class="position-absolute top-50 start-50 translate-middle">
<div class="card text-center text-dark">
  <div class="card-header bg-warning p-2 text-dark bg-opacity-25">
  <h5 class="card-title">hello {name}!</h5>
  </div>
  <div class="card-body">
    
    {log ?
    <p class="card-text fs-5">Welcome to iNotebook-The note book in the cloud</p>
    :
    <p className='card-text fs-5'>Welcome to iNotebook please Login</p>
   }
  
  </div>
  
</div>
</div>

      </div>
  )
}

