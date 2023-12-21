import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationLogic from './RegistrationLogic';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import classes from './registration.module.css';

const Registration = () => {
   const navigate = useNavigate();
   const baseURL = process.env.REACT_APP_API_URL;
   const { formData, setFormData, err, valid, handleSubmit } = RegistrationLogic(baseURL, navigate);
   
  return (
     <section className={classes['card']}>
        <h1 className={classes['title']}>Sign In</h1>
        <form onSubmit={handleSubmit}>
           <div className={classes['inputs_container']}>
              <input type="email" placeholder="Username" name="email" onChange={(e) => setFormData({...formData, email:e.target.value})} />
              {
                 valid ? <></> : <span className={classes['error_msg']}> {err.email} </span>
              }
              <input type="password" placeholder="Password" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              {
                 valid ? <></> : <span className={classes['error_msg']}> {err.password} </span>
              }
           </div>
           <button className={classes['login_button']}>Log In</button>
        </form>
        <p className={classes['text']}>Or Sign Up Using</p>
        <div className={classes['btn_google']} >
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