import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import '../styles/SignUp.css'; // Import CSS file for additional styling
export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await res.json();
    console.log(json);
    if(!json.success)
    {
      alert("Enter valid credentials");
    }
    else
    {
      alert("You have successfully registered");   
    }
  }

  const onInput = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div style={{ backgroundColor: "#eee", overflow: "hidden" }}>
      <div><Navbar /></div>
      <div className='vh-100'>
        <div className="vh-75 container" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", marginTop: "0.9rem" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-9">
                <div className="card text-black" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-md-4">
                    <div className="row justify-content-center">
                      <div className="col-md-8 col-lg-5 col-xl-4 order-2 order-lg-1">
                        <p className="text-center h2 fw-bold mb-4">Sign up</p>
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-user fa-lg me-2 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="text" id="formName" className="form-control" name='name' value={credentials.name} onChange={onInput} />
                              <label className="form-label" htmlFor="formName">Your Name</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-envelope fa-lg me-2 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="email" id="formEmail" className="form-control" name='email' value={credentials.email} onChange={onInput} />
                              <label className="form-label" htmlFor="formEmail">Your Email</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-lock fa-lg me-2 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="password" id="formPassword" className="form-control" name='password' value={credentials.password} onChange={onInput} />
                              <label className="form-label" htmlFor="formPassword">Password</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-key fa-lg me-2 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input type="text" id="forAddress" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onInput} />
                              <label className="form-label" htmlFor="forAddress">Address</label>
                            </div>
                          </div>
                          <div className="form-check d-flex justify-content-center mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="formAgreement" />
                            <label className="form-check-label" htmlFor="formAgreement">
                              I agree to the <a href="#!">Terms of Service</a>
                            </label>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <Link to="/login" data-mdb-button-init data-mdb-ripple-init >Already a user ? Login</Link>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-8 col-lg-7 col-xl-8 d-flex align-items-center order-1 order-lg-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop:"11rem"}}><Footer /></div>
    </div>
  );
}
