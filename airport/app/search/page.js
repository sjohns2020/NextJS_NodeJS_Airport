
import {getFlights}  from '../components/flightService';
import FlightList from "../components/flightList";
import SearchBox from "./searchBox";


export const metadata = {
    title: 'Search',
    description: 'NEXTJS Edinburgh Airport App',
  }

const Search = async () => {

    const flights = await getFlights()

    return (
        <main>
            <h1>I am the Search Page</h1>
            <SearchBox />
            <FlightList flights={flights}/>
        </main>
    );
}

export default Search;