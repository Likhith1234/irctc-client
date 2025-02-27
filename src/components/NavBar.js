import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css";

const NavBar = () => {

    // const ifLoggedIn = () => {
    //   return <header>
    //   <div>
    //       <img src="/assets/train.svg" width={40} height={40} style={{paddingLeft:"1em"}} alt="Train"/>
    //   </div>
    //   <nav>
    //     <ul>
    //       <li><Link className='link' to="/">Home</Link></li>
    //       <li><Link className='link' to="/trains/bookings">Bookings</Link></li>
    //       <li><Link className='link' to="/help">Help</Link></li>
    //     </ul>
    //   </nav>
    // </header>
    // }

    return (
      <header>
        <div>
            <img src={`${process.env.PUBLIC_URL}/assets/train.svg`} width={40} height={40} style={{paddingLeft:"1em"}} alt="Train"/>
        </div>
        <nav>
          <ul>
            <li><Link className='link' to="/">Home</Link></li>
            <li><Link className='link' to="/signUp">SignUp</Link></li>
            <li><Link className='link' to="/help">Help</Link></li>
          </ul>
        </nav>
      </header>
    )
}

export default NavBar;
