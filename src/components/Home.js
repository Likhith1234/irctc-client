import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Home.css"

const Home = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [logMessage, setLogMessage] = useState("");
    const navigate = useNavigate();
    
  const loginUser = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    fetch("https://irctc-server-8hhw.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
        console.log(data)
        if (data.access_token) {
          sessionStorage.setItem("MY_IRCTC_ACCESS_TOKEN", data.access_token);
          setLogMessage(data.status);
          setErrorMessage("");
          setShouldRedirect(true);
        }
        else {
          setLogMessage("");
          setErrorMessage(data.status);
          setShouldRedirect(false);
        }
    })
  }

    useEffect(() => {
        if (shouldRedirect) {
            navigate("/trains");
        }
    }, [shouldRedirect, navigate]);
  // if (shouldRedirect) {
  //       navigate("/trains");
  //       return <h1>Loading...</h1>;
  //   }

    return (
      <div className='container'>
        <div className='form-div'>
            <form onSubmit={event => loginUser(event)} >
                <label htmlFor='username'>Username: </label>
                <input type='text' id='username' name='username' placeholder='Enter your Username' autoComplete='off' required /><br />
                <label htmlFor='password'>Password: </label>
                <input type='password' style={{color:'white'}} id='password' name='password' placeholder='Enter your password' required/><br />
                <input type='submit' value='LogIn' /><br />
            </form>
            <div className="message">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {logMessage && <p style={{ color: 'green' }}>{logMessage}</p>}
            </div>
        </div>
        <div className='image'>
            <img src='/assets/train.svg' alt='Irctc Train'/>
        </div>
      </div>
    )
  }

export default Home
