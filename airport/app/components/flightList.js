'use client'
import { useEffect, useState } from "react";
import "./flightList.css"
import FilterBar from "./filterBar";
import FlightCard from "./flightCard";
import SortButton from "./sortButton";
import { getUniqueAirlines, sortFlights } from "./flightService"


const FlightList = ({ flights }) => {

    // const FlightList = ({ flights, getDepartures, getArrivals, getFlights, sortFlights, searchFlight, setSearchError, tab, setTab, uniqueAirlines }) => {
    // Handles state to conditionally render the expansion of the flight card
    const [uniqueAirlines, setUniqueAirlines] = useState(getUniqueAirlines(flights));
    const [displayedFlights, setDisplayedFlights] = useState(flights)
    const [search, setSearch] = useState(null)


    // Handles the column heading being clicked and sorts 
    // the flight data in the FlightContainer
    const sortByColumn = (e) => {
        const sortedFlights = sortFlights(flights, e.target.value);
        setDisplayedFlights(sortedFlights)
    }

    // Handles displaying a FlightCard component for each flight
    let flightList = displayedFlights.map((flight) => {
        return (
            <div className="table-row-container" key={flight.flightNo}>
                <FlightCard flight={flight} />
            </div>
        )
    })

    if (!uniqueAirlines) return "Loading..."

    return (
        <main>
            <div className="table-search-container">
                <div className="table-container">
                    <div className="table">
                        <FilterBar uniqueAirlines={uniqueAirlines} setDisplayedFlights={setDisplayedFlights} />

                        <div className="table-column" key="">
                            <SortButton column="image" sortByColumn={sortByColumn}>AIRLINE</SortButton>
                            <SortButton column="time" sortByColumn={sortByColumn}>TIME</SortButton>
                            <SortButton column="portOfCallA" sortByColumn={sortByColumn}>FLIGHT DETAILS</SortButton>
                            <SortButton column="status" sortByColumn={sortByColumn}>STATUS</SortButton>
                            <div className="more-details">
                                <button className="button-sort">MORE DETAILS</button>
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