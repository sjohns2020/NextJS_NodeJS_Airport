'use client'
import { useEffect, useState } from "react";
import "./flightList.css"
import FilterBar from "./filterBar";
import FlightCard from "./flightCard";
import { getUniqueAirlines, getFlights } from "./flightService"


const FlightList = ({ flights }) => {

    // const FlightList = ({ flights, getDepartures, getArrivals, getFlights, sortFlights, searchFlight, setSearchError, tab, setTab, uniqueAirlines }) => {
    // Handles state to conditionally render the expansion of the flight card
    const [uniqueAirlines, setUniqueAirlines] = useState([]);
    const [displayedFlights, setDisplayedFlights] = useState(flights)
    const [search, setSearch] = useState(null)

    useEffect(() => {
        const airports = getUniqueAirlines(flights)
        setUniqueAirlines(airports)
    }, [])

    // Handles the column heading being clicked and sorts 
    // the flight data in the FlightContainer
    const sortByColumn = (e) => {
        sortFlights(e.target.value);
    }

    // Handles displaying a FlightCard component for each flight
    let flightList = displayedFlights.map((flight) => {
        return (
            <div className="table-row-container" key={flight.flightNo}>
                <FlightCard flight={flight} />
            </div>
        )
    })

    return (
        <main>
            <div className="table-search-container">
                <div className="table-container">
                    <div className="table">           
                        <FilterBar uniqueAirlines={uniqueAirlines} setSearch={setSearch} />

                        <div className="table-column" key="">
                            <div className="image">
                                <button className="button-sort" value="airline" onClick={sortByColumn}>AIRLINE</button>
                            </div>
                            <div className="time">
                                <button className="button-sort" value="time" onClick={sortByColumn}>TIME</button>
                            </div>
                            <div className="portOfCallA">
                                <button className="button-sort" value="portOfCallA" onClick={sortByColumn}>FLIGHT DETAILS</button>
                            </div>
                            <div className="status">
                                <button className="button-sort" value="status" onClick={sortByColumn}>STATUS</button>
                            </div>
                            <div className="more-details">
                                <button className="button-sort" >MORE DETAILS</button>
                            </div>

                        </div>
                        {flightList}
                    </div>
                </div>
            </div>
        </main>
    );
}
export default FlightList;