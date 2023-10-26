//app/departures/page.js

import { getDepartures } from '../utils/flightService';
import FlightContainer from '../components/flightContainer';

export const metadata = {
  title: 'Departures',
  description: 'NEXTJS Edinburgh Airport App',
};

const Departures = async () => {
  const departures = await getDepartures();

  return (
    <main>
      <div className="page-title-arrivals">
        <h1>Departures</h1>
      </div>

      <FlightContainer flights={departures} />
    </main>
  );
};

export default Departures;
