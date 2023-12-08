import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios  from "axios"
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import "./registration.css"

const Registration = () => {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });
   const [err, setErr] = useState({})
   const [valid, setValid] = useState(true)
   const navigate = useNavigate()

   const handleSubmit = (e) => {
      e.preventDefault();
      let isvalid = true;
      let validationErrors = {}
      if(formData.email=== "" || formData.email === "null"){
         isvalid = false;
         validationErrors.email = "Email requred"
      }else if(!/\S+@\S+\.\S+/.test(formData.email)){
         isvalid = false;
         validationErrors.email = "Email is not valid"
      }
      if (formData.password === "" || formData.password === "null") {
         isvalid = false;
         validationErrors.password = "Password requred"
      } else if (formData.password.length<6) {
         isvalid = false;
         validationErrors.password = "Password lenght at least 6 char"
      }
      setErr(validationErrors)
      setValid(isvalid)

      if(Object.keys(validationErrors).length === 0){
         axios.post(' http://localhost:8000/users', formData)
         .then(res => {
            //alert("Registered Successfully")
            navigate('/home')
         })
         .catch(err => console.log(err))
      }
      
   };

  return (
     <section className="card">
        <h1 className="title">Sign In</h1>
        <form onSubmit={handleSubmit}>
           <div className="inputs_container">
              <input type="email" placeholder="Username" name="email" onChange={(e) => setFormData({...formData, email:e.target.value})} />
              {
                 valid ? <></> : <span className="error_msg "> {err.email} </span>
              }
              <input type="password" placeholder="Password" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              {
                 valid ? <></> :<span className="error_msg "> {err.password}; </span>
              }
           </div>
           <button className="login_button">Log In</button>
        </form>
        <p className='text'>Or Sign Up Using</p>
        <div className='btn_google'>
           <GoogleOAuthProvider clientId="7166725746-kddubk9vprbflvbnpcqfo8u889r1cgb2.apps.googleusercontent.com">
              <GoogleLogin
                 theme="filled_black"
                 shape="circle"
                 onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                 }}
                 onError={() => {
                    console.log('Login Failed');
                 }}
              />
           </GoogleOAuthProvider>
        </div>
     </section>
  )
}

export default Registration