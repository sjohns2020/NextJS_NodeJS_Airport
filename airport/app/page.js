
import {getFlights} from './components/flightService';
import FlightList from './components/flightList';


const Home = async () => {

  const allFlights = await getFlights()

  return (
    <main>
      <h1>I am the Home Page</h1>
      <FlightList flights={allFlights}/>
    </main>
  )
}

export default Home;
