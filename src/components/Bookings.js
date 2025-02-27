import React, { useEffect, useState } from 'react';
import "../styles/Bookings.css";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch("https://irctc-server-8hhw.onrender.com/trains/bookings",{
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("MY_IRCTC_ACCESS_TOKEN")
            }
        })
        .then(response => response.json())
        .then(bookings => setBookings(bookings))
    }, []);

    const displayBookings = () => {
        return bookings.map((booking, index) => {
            const { train_name, source, destination, arrival_time_at_source, arrival_time_at_destination, seat_numbers } = booking;
            return <div key={index} className='box'>
                <div className='short-details'>
                    <div className='train-image'>
                        <img src={`${process.env.PUBLIC_URL}/assets/train.svg`} alt='Train' />
                    </div>
                    <div className='booking-details'>
                        <p><b>Train Name: </b>{train_name}</p>
                        <p><b>Source: </b>{source}</p>
                        <p><b>Destination: </b>{destination}</p>
                    </div>
                    <div className='booking-buttons'>
                        <button className='booking-button'>More Details</button>
                    </div>
                </div>
                <div className='more-details'>
                    <p><b>Train Name: </b>{train_name}</p>
                    <p><b>Source: </b>{source}</p>
                    <p><b>Destination: </b>{destination}</p>
                    <p><b>Arrival Time at Source: </b>{arrival_time_at_source}</p>
                    <p><b>Arrival Time at Destination: </b>{arrival_time_at_destination}</p>
                    <p><b>Seat Numbers: </b>{seat_numbers}</p>
                </div>
            </div>
        })
    }

  return (
    <div className='container boxes'>
        {bookings.length !== 0 ? displayBookings() : null}
    </div>
  )
}

