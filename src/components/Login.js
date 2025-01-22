import React from 'react'
import './Login.css';
import { FaUser, FaLock, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";



function CustomLogin() {
  return (
    <div className='logform'>
    <form className='loginForm'> 
      <h1>Login</h1>
      <div className='formBody'>
        <div>
          <div className='Box'>
            <input type="text" name='username' placeholder='Username' required /> 
            <FaUser className='icon' />
          </div>
          <div className='Box'>
            <input type='password' name='password' placeholder='Password' required />
            <FaLock className='icon'/>
          </div>
        
          <div className='rem'>
            <label><input type='checkbox' name='Remember' /> Remember Me </label>
            <a href='#'>Forgot Password ?</a>
          </div>

          <button className="button" type="submit"> Login</button>

          <div className="register">
            <label> Don't have an account? </label>
            <a href='#'>Register</a> <br /><br /><br />
          </div>

          <div> 
            <button className="loginbutton" type="submit"> 
              <FcGoogle className="gicon" />Login with Google
            </button>
          </div>
          <br />

          <div>
            <button className='fbbutton' type='submit' name='fbbutton'> 
              <FaFacebook /> Login with Facebook
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  )
}

export default CustomLogin