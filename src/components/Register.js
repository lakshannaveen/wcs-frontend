// Register.js
import React from 'react';
import './Register.css';
import { FaUser, FaLock, FaEnvelope  } from "react-icons/fa";


function CustomRegister() {
  return (
    <div className='regform'>
      <form className='registerForm'>
        <h1>Register</h1>
        <div className='formBody'>
          <div>
            <div className='Box'>
              <select name='title' className='dropdown' required>
                <option value='' disabled selected>Title</option>
                <option value='Mrs'>Mrs</option>
                <option value='Ms'>Ms</option>
              </select>
            </div>

            <div className='Box'>
              <input type="text" name='firstname' placeholder='First Name' required />
              <FaUser className='icon' />
            </div>

            <div className='Box'>
              <input type="text" name='lastname' placeholder='Last Name' required />
              <FaUser className='icon' />
            </div>

            <div className='Box'>
              <input type="text" name='username' placeholder='Username' required />
              <FaUser className='icon' />
            </div>

            <div className='Box'>
              <input type="email" name='email' placeholder='Email' required />
              <FaEnvelope className='icon' />
            </div>

            <div className='Box'>
              <input type='password' name='createpassword' placeholder='Create Password' required />
              <FaLock className='icon' />
            </div>

            <div className='Box'>
              <input type='password' name='confirmpassword' placeholder='Confirm Password' required />
              <FaLock className='icon' />
            </div>

            <button className="button" type="submit"> Submit</button>
            
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomRegister;
