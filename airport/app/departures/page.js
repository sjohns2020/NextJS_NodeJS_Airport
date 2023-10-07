//app/departures/page.js

import {getDepartures}  from '../components/flightService';
import FlightList from '../components/flightList';

export const metadata = {
    title: 'Departures',
    description: 'NEXTJS Edinburgh Airport App',
}


const Departures = async () => {

    const departures = await getDepartures()

    return (
        <main>
            <h1>Departures</h1>
            <FlightList flights={departures}/>
        </main>
    );
}

export default Departures;