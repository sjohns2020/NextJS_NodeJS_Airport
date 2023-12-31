// This file handles all requests for flight data

// GET ALL FLIGHTS
export const getFlights = async (search) => {
  // If there is a search parameter
  if (search) {
    if (search['flightNo']) {
      const searchTerm = search['flightNo'];
      const res = await fetch(
        `http://localhost:8080/api/flights?flightNo=${searchTerm}`
      );
      return res.json();
    }
    if (search['status']) {
      const searchTerm = search['status'];
      const res = await fetch(
        `http://localhost:8080/api/flights?status=${searchTerm}`
      );
      return res.json();
    }
    if (search['airline']) {
      const searchTerm = search['airline'];
      const res = await fetch(
        `http://localhost:8080/api/flights?airline=${searchTerm}`
      );
      console.log(searchTerm);
      return res.json();
    }
  }
  // If there is no search parameter GET ALL FLIGHTS
  else {
    const res = await fetch('http://localhost:8080/api/flights');
    return res.json();
  }
};

// GET ALL DEPARTURES
export const getDepartures = async () => {
  const res = await fetch('http://localhost:8080/api/flights/departures');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// GET ALL ARRIVALS
export const getArrivals = async () => {
  const res = await fetch('http://localhost:8080/api/flights/arrivals');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// GET FLIGHT BY FLIGHT NUMBER
export const getFlight = async (flightNo) => {
  const res = await fetch(
    `http://localhost:8080/api/flights/flight/${flightNo}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// getUniqueAirlines handles the filters in the FilterBar component. Returns a unique list of airlines.
export const getUniqueAirlines = (allFlights) => {
  const uniqueFlightsByAirline = allFlights.reduce((accumulator, flight) => {
    // Check if the airline already exists in the accumulator
    const existingAirline = accumulator.find(
      (item) => item.airline === flight.airline
    );
    // If the airline exists, no need to add a duplicate entry
    if (existingAirline) {
      return accumulator;
    }
    // If the airline doesn't exist, add it to the accumulator
    return [...accumulator, flight];
  }, []);
  return uniqueFlightsByAirline;
};

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

// NEXT v13 -> Dont need to do this anymore
// export async function getAllFlightIds() {
//     const flights = await getFlights()
//     return flights.map((flight) => {
//         // let id = flight.id.toString()

//         return {
//             params: {
//                 id: flight.flightNo,
//             },
//         };
//     });
// }
