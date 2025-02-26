import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
  const signUpUser = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    fetch("https://irctc-server-8hhw.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.user_id) {
            alert("SignUp successful. Please LogIn now to continue.")
            setShouldRedirect(true);
        }
        else {
            setErrorMessage(data.status);
        }
    })
  }

    // Check if redirection is needed
    if (shouldRedirect) {
        navigate("/");
      return <h1>Loading...</h1>;
    }
    return (
      <div className='container'>
        <div className='form-div'>
            <form onSubmit={event => signUpUser(event)} >
                <label htmlFor='email'>Email: </label>
                <input type='email' id='email' name='email' placeholder='Enter your email' autoComplete='off' required/><br />
                <label htmlFor='username'>Username: </label>
                <input type='text' id='username' name='username' placeholder='Enter your Username' autoComplete='off' autoCapitalize='on' required /><br />
                <label htmlFor='password'>Password: </label>
                <input type='password' style={{color:'white'}} id='password' name='password' placeholder='Enter your password' required/><br />
                <input type='submit' value='SignUp' /><br />
            </form>
            <div className="message">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {/* {logMessage && <p style={{ color: 'green' }}>{logMessage}</p>} */}
            </div>
        </div>
        <div className='image'>
            <img src='/assets/train.svg' alt='Irctc Train'/>
        </div>
      </div>
    )
  }

export default SignUp;