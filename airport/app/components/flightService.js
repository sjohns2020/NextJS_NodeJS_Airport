export const getData = async () => {
    // const res = await fetch('http://localhost:8080/api/flights', { cache: 'force-cache', next: { revalidate: 3600 } }) 
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }



// GET ALL FLIGHTS
export const getFlights = async(search) => {
    // If there is a search parameter
    if (search) {
        if (search["flightNo"]) {
            const searchTerm = search["flightNo"];
            const res = await fetch(`http://localhost:8080/api/flights?flightNo=${searchTerm}`);
            return res.json();
        }
        if (search["status"]) {
            const searchTerm = search["status"];
            const res = await fetch(`http://localhost:8080/api/flights?status=${searchTerm}`);
            return res.json();
        }
        if (search["airline"]) {
            const searchTerm = search["airline"];
            const res = await fetch(`http://localhost:8080/api/flights?airline=${searchTerm}`);
            return res.json();
        }
    }
    // If there is no search parameter GET ALL FLIGHTS
    else {
        const res = await fetch('http://localhost:8080/api/flights');
        return res.json();
    }
}


// GET ALL DEPARTURES
export const getDepartures = async () => {
    const res = await fetch('http://localhost:8080/api/flights/departures');
    return res.json();
}

// GET ALL ARRIVALS
export const getArrivals = async () => {
    const res = await fetch('http://localhost:8080/api/flights/arrivals');
    return res.json();
}

// SearchFlights handles any search for Flight Number 
export const searchFlight = async (flights, search) => {
    if (search) {
        if (search["flightNo"]) {
            console.log(search["flightNo"]);
            for (const flight of flights) {
                if (search["flightNo"] === flight.flightNo) {
                    const searchTerm = search["flightNo"];
                    const res = await fetch(`http://localhost:8080/api/flights/flight/${searchTerm}`);
                    return res.json();
                }
                else {
                    getFlights(search);
                }
            }
        }
        if (search["airline"]) {
            getFlights(search);
        }
        else {
            getFlights(search);
        }
    }
    else {
        getFlights();
    }
}

// getUniqueAirlines handles the filters in the FilterBar component. Returns a unique list of airlines.
export const getUniqueAirlines = (allFlights) => {
    const uniqueFlightsByAirline = allFlights.reduce((accumulator, flight) => {
        // Check if the airline already exists in the accumulator
        const existingAirline = accumulator.find(item => item.airline === flight.airline);
        // If the airline exists, no need to add a duplicate entry
        if (existingAirline) {
            return accumulator;
        }
        // If the airline doesn't exist, add it to the accumulator
        return [...accumulator, flight];
    }, []);
    return uniqueFlightsByAirline;
    // setUniqueAirlines(uniqueFlightsByAirline);
}


// sortFlights handles the sorting of the flight data being displayed from the headers in the flight list. 
export const sortFlights = (flights, sortKey) => {
    const copiedFlights = [...flights];
    const sortedFlights = copiedFlights.sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    });

    return sortedFlights;
};