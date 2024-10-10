import React from 'react'
import './Search.css';
import { Form, Button } from 'react-bootstrap';


function Search() {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="search-box p-4 rounded bg-white shadow-lg">
        <h4 className="text-center">Start Your Order Here</h4>
        <div className="input-container d-flex">
          <Form.Control 
            type="text" 
            placeholder="Enter Your Location" 
            className="search-input" 
          />
        <Button  className='search-btn'>
            <i className="bi bi-search"></i> Search
          </Button>
           </div>
      </div>
    </div>
  )
}

export default Search
