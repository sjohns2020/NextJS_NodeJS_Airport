'use client'

import "./filterBar.css";
import { getFlights } from "./flightService"
import React, { useState } from 'react';



const FilterBar = ({ uniqueAirlines, setDisplayedFlights, handleSearch }) => {

    const [activeStatus, setActiveStatus] = useState(null);

    const handleFlightStatusChange = async (status) => {
        const search = {
            status: status
        };
        const flights = await getFlights(search)
        setDisplayedFlights(flights)
    }

    const handleAirlineChange = async (airline) => {
        const flights = await getFlights(airline)
        setDisplayedFlights(flights)
    }

    const airlines = uniqueAirlines.map((flight) => {
        let searchTerm = flight.airline;
        if (searchTerm.includes(' ')) {
            const array = searchTerm.split(' ');
            searchTerm = array[0];
        }
        return (
            <img key={flight.flightNo} src={flight.image} alt={flight.airline} onClick={() => {
                handleAirlineChange({ airline: searchTerm });
                setActiveStatus(searchTerm);
            }} className={searchTerm === activeStatus ? 'active common-size' : 'common-size'} />


        )
    })

    return (
        <div className="filter-container">
            <div className="airport-images">
                {[
                    { icon: "fa-solid fa-plane-departure", label: "Airborn", value: "AIRBORN" },
                    { icon: "fa-solid fa-plane-arrival", label: "Landed", value: "LANDED" },
                    { icon: "fa-solid fa-taxi", label: "Taxied", value: "TAXIED" },
                    { icon: "fa-solid fa-rectangle-xmark", label: "Gate-Open", value: "GATE" },
                    { icon: "fa-solid fa-clock", label: "Expected", value: "EXPECTED" },
                    { icon: "fa-regular fa-clock", label: "Sheduled", value: "SCHEDULED" },
                    { icon: "fa-solid fa-person-walking-dashed-line-arrow-right", label: "Last Call", value: "LAST" },
                    { icon: "fa-regular fa-hourglass-half", label: "Estimated", value: "ESTIMATED" }
                ].map(status => (
                    <div className={status.value === activeStatus ? 'filter-button active common-size' : 'filter-button common-size'} key={status.value}>
                        <button value={status.value} onClick={() => {
                            handleFlightStatusChange(status.value);
                            setActiveStatus(status.value);
                        }}>
                            {/* <p className={status.icon}></p> */}
                            {status.label}
                        </button>
                    </div>
                ))}
            </div>
            <div className="airport-images">
                <button className="filter-button common-size" onClick={() => { handleSearch() }}>
                    Reset Filters
                </button>

                {airlines}
            </div>
        </div>
    );
}

export default FilterBar;
