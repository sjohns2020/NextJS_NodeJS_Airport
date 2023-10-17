'use client'

import Link from "next/link";
import "./flightCard.css"

// FlightCard renders each row in the flight list table 
const FlightCard = ({ flight }) => {


    // Handles Formatting Time to display on the page removing the last :00
    const [hours, minutes] = flight.time.split(":").slice(0, 2);
    const formattedTime = `${hours}:${minutes}`;


    // Had to use a fragment here as return expects JSX and not a ternary.
    return (
        <div className="table-row">
            <div className="image">
                <img src={flight.image} alt={flight.airline}></img>
            </div>
            <div className="time">
                <p>{formattedTime}</p>
            </div>
            <div className="portOfCallA">
                <h5>{flight.portOfCallA}</h5>
                <div className="flightDetails">
                    <h3>{flight.flightNo}</h3>
                    <p>{'\u0020'}{flight.airline}</p>
                </div>
            </div>
            <div className="status">
                <p>{flight.status}</p>
            </div>
            <div className="more-details-button">
            <Link href={"/" + flight.flightNo}>Show More</Link>
            </div>
        </div>
    );
}

export default FlightCard;
