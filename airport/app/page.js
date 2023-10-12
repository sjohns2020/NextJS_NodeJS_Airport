
import { getFlights } from './utils/flightService';
import FlightList from './components/flightList';
import SearchBox from './components/searchBox';
import Image from 'next/image';


const Home = async () => {

  const allFlights = await getFlights()

  return (
    <main id="homepage">
      <div className="home-page-title">
        <h1>Welcome to Edinburgh Airport Flight Board </h1>
      </div>
    </main>
  )
}

export default Home;
