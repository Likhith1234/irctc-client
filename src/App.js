import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from './components/Home';
import SignUp from './components/SignUp';
import Help from './components/Help';
import NoPage from './components/NoPage';
import Trains from './components/Trains';
import Bookings from './components/Bookings';
import { useEffect, useState } from 'react';

function App() {
  const [ isAuthenticated, setAuthentication ] = useState(false);
  // const [ loginStatus, setLoginStatus ] = useState(false);

  useEffect(() => {
    sessionStorage.getItem("MY_IRCTC_ACCESS_TOKEN") ? setAuthentication(true) : setAuthentication(false)
  }, []);

  return (
    <div className="App">
      <HashRouter basename='/'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/help' element={<Help />} />
          <Route path='/trains' element={  <Trains /> } />
          <Route path='/trains/bookings' element={ isAuthenticated ? <Bookings /> : <Home />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
