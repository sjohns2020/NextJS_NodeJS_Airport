//app/departures/page.js

import { getDepartures } from '../components/flightService';
import FlightList from '../components/flightList';

export const metadata = {
    title: 'Departures',
    description: 'NEXTJS Edinburgh Airport App',
}


const Departures = async () => {

    const departures = await getDepartures()

    return (
        <main>
            <div className="pageTitle">
                <h1>Departures</h1>
                <p>Todays flights departing from Edinburgh Airport</p>
            </div>

            <FlightList flights={departures} />
        </main>
    );
}

export default Departures;