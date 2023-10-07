
import {getArrivals}  from '../components/flightService';
import FlightList from '../components/flightList';


export const metadata = {
    title: 'Arrivals',
    description: 'NEXTJS Edinburgh Airport App',
  }

const Arrivals = async () => {

    const arrivals = await getArrivals()

    return (
            <main>
                <h1>I am the Arrivals Page</h1>
                <FlightList flights={arrivals}/>
            </main>

    );
}

export default Arrivals;
