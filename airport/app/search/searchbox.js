"use client"

import { useState } from "react";

const SearchBox = () => {

    const searchFlight = (search) => {
        console.log(search)
    }

    // State for the inputted flight number
    const [searchFlightNo, setSearchFlightNo] = useState(null)

    // Sets searchFlightNo state when the input is changed
    const handleFlightNoChange = (e) => {
        setSearchFlightNo(e.target.value)
    }

    // Handler for the search form to be submitted.  Sends the search term as an object so that it is open to extension for more searches to be added.
    const handleSubmit = (e) => {
        e.preventDefault()
        const search = {
            flightNo: searchFlightNo,
        }
        searchFlight(search)
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto items-center border rounded-lg overflow-hidden mt-4">
            <input
                id="search"
                type="text"
                onChange={handleFlightNoChange}
                placeholder="Search Flight No..."
                data-tab="sortFlights"
                className="flex-grow py-2 px-4 outline-none text-black"
            />
            <button type="submit" data-tab="sortFlights" className="bg-blue-500 text-white py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-r-lg">
                Search
            </button>
        </form>

    );
}

export default SearchBox;