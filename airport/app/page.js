
import {getFlights} from './components/flightService';
import FlightList from './components/flightList';


const Home = async () => {

  const allFlights = await getFlights()

  return (
    <main id="homepage">
      <h1 className="pageTitle">Welcome to Edinburgh Airport Flight Board </h1>
      {/* <FlightList flights={allFlights}/> */}
    </main>
  )
}

export default Home;
