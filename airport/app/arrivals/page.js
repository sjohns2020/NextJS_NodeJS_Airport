
import { getArrivals } from '../components/flightService';
import FlightContainer from '../components/flightContainer';


export const metadata = {
    title: 'Arrivals',
    description: 'NEXTJS Edinburgh Airport App',
}

const Arrivals = async () => {

    const arrivals = await getArrivals()

    return (
        <main>
            <div className="pageTitle">
                <h1>Arrivals</h1>
            </div>
            <FlightContainer flights={arrivals} />
        </main>

    );
}

export default Arrivals;
