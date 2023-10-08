
import {getFlights} from './components/flightService';
import FlightList from './components/flightList';
import SearchBox from './search/searchBox';
import Image from 'next/image';


const Home = async () => {

  const allFlights = await getFlights()

  return (
    <main id="homepage">
      <h1 className="pageTitle">Welcome to Edinburgh Airport Flight Board </h1>
      <Image alt="sky" src="/images/sky.jpg" width="40" height="40" />
      <SearchBox />
      {/* <FlightList flights={allFlights}/> */}
    </main>
  )
}

export default Home;
