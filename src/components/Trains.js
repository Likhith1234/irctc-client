import React, {useEffect, useState} from 'react';
import "../styles/Trains.css";
import AdSenseAd from './AdSenseAd';

export default function Trains() {
    const [trains, setTrains] = useState([]);
    const [bookingPhase, setBookingPhase] = useState(false);
    const [bookingTrainDetails, setBookingTrainDetails] = useState({});

    useEffect(() => {
        fetch("https://irctc-server-8hhw.onrender.com/trains/display")
        .then(response => response.json())
        .then(data => setTrains(data));
    }, []);

    const bookingWindow = () => {
        const { train_name, source, destination, available_seats } = bookingTrainDetails;
        return <div className='booking-window'>
            <nav>
                <button onClick={() => {setBookingPhase(false)}} className='close-btn'>X</button>
            </nav>
            <form onSubmit={(event) => bookTrain(event, bookingTrainDetails)}>
                <div>
                    <input placeholder='Train Name' name='train-name' value={train_name} readOnly/>
                    <input placeholder='Source' name='source' value={source} readOnly/><span color='red'>--------------&gt;</span>
                    <input placeholder='Destination' name='destination' value={destination} readOnly/>
                </div>
                <div>
                    <input name='no_of_seats' placeholder='Number of Seats' type='number' required min={1} max={6}/>
                </div>
                <input type='submit' value="Book" />
                <div>
                    <p className='booking-status'></p>
                </div>
            </form>
        </div>
    }

    const bookTrain = async (e, train) => {
        e.preventDefault();
        const train_id = await checkAvailability(train);
        const user_session_token = sessionStorage.getItem("MY_IRCTC_ACCESS_TOKEN");
        console.log(user_session_token)
        const fetch_obj = {
            method: "POST",
            body: JSON.stringify({
                "no_of_seats": e.target.no_of_seats.value
            }),
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + user_session_token
            }
        }
        try {
            const response = await fetch("https://irctc-server-8hhw.onrender.com/trains/book/"+train_id, fetch_obj);
            const data = await response.json();
            // console.log(data);
            document.getElementsByClassName("booking-status")[0].innerHTML = data.message;
        } catch (error) {
            console.log("Error:", error);
        }

    }

    const checkAvailability = async (train) => {
        const { source, destination } = train;
        try {
            const response = await fetch(`https://irctc-server-8hhw.onrender.com/trains/availability?source=${source}&destination=${destination}`);
            const data = await response.json();
            if (!bookingPhase){
                alert(`Available Seats: ${data[0].available_seats}`);
            }
            else return data[0].train_id;
        }
        catch(err) {
            console.error("Error fetching availability:", err);
        }
    }

    const displayTrains = () => {
        return trains.map((train, index) => {
            const { train_name, source, destination, arrival_time_at_source, arrival_time_at_destination } = train;
            return (
                <div key={index} className='tile'>
                    <div className='train-image'>
                        <img src={`${process.env.PUBLIC_URL}/assets/train.svg`} alt='Train' />
                    </div>
                    <div className='train-details'>
                        <h5>{train_name}</h5>
                        <p>{source}<sub>({arrival_time_at_source})</sub> -------&gt; {destination}<sub>({arrival_time_at_destination})</sub></p>
                    </div>
                    <div className='train-buttons'>
                        <button onClick={() => {
                            setBookingPhase(true);
                            setBookingTrainDetails(train);
                            }} className='train-button'>Book</button>
                        <button onClick={() => checkAvailability(train)} className='train-button'>Check Availability</button>
                    </div>
                </div>
            );
        });
    }

  return (
    <div className='container tiles'>
        <AdSenseAd />
        {trains.length !== 0 ? displayTrains() : null}
        {bookingPhase ? bookingWindow() : null}
    </div>
  )
}
