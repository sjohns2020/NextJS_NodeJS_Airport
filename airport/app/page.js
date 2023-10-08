
import {getFlights} from './components/flightService';
import FlightList from './components/flightList';
import SearchBox from './search/searchBox';


const Home = async () => {

  const allFlights = await getFlights()

  return (
    <main id="homepage">
      <h1 className="pageTitle">Welcome to Edinburgh Airport Flight Board </h1>
      <SearchBox />
      {/* <FlightList flights={allFlights}/> */}
    </main>
  )
}

export default Home;
