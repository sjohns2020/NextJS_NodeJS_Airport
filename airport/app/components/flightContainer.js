'use client'
import SearchBox from "./searchBox";
import FlightList from "./flightList";
import { useState } from "react";
import { getFlight, getFlights } from "../utils/flightService";


const FlightContainer = ({flights}) => {

    const [displayedFlights, setDisplayedFlights] = useState(flights)

    const handleSearch = async (searchTerm) => {
        const searchedFlights = await getFlights(searchTerm)
        setDisplayedFlights(searchedFlights)
    }


    return ( 
        <>
            <SearchBox handleSearch={handleSearch}/>
            <FlightList flights={displayedFlights} setDisplayedFlights={setDisplayedFlights} handleSearch={handleSearch}/>
        </>
     );
}
 
export default FlightContainer;