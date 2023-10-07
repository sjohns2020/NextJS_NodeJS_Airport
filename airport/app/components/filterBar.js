'use client'

import "./filterBar.css";

const FilterBar = ({ uniqueAirlines, setSearch }) => {

    const handleFlightStatusChange = (e) => {
        let searchStatus = e.target.value;
        const search = {
            status: searchStatus
        };
        setSearch(search);
    }

    const airlines = uniqueAirlines.map((flight) => {
        let searchTerm = flight.airline;
        if (searchTerm.includes(' ')) {
            const array = searchTerm.split(' ');
            searchTerm = array[0];
        }
        return (
            <img key={flight.flightNo} src={flight.image} alt={flight.airline} onClick={() => { setSearch({ airline: searchTerm }); }} />
        );
    })

    return (
        <div className="filter-container">
            <div className="flight-buttons">
                {[
                    { icon: "fa-solid fa-plane-departure", label: "Airborn", value: "AIRBORN" },
                    { icon: "fa-solid fa-plane-arrival", label: "Landed", value: "LANDED" },
                    { icon: "fa-solid fa-taxi", label: "Taxied", value: "TAXIED" },
                    { icon: "fa-solid fa-rectangle-xmark", label: "Gate Closed", value: "GATE" },
                    { icon: "fa-solid fa-clock", label: "Expected", value: "EXPECTED" },
                    { icon: "fa-regular fa-clock", label: "Sheduled", value: "SCHEDULED" },
                    { icon: "fa-solid fa-person-walking-dashed-line-arrow-right", label: "Last Call", value: "LAST" },
                    { icon: "fa-regular fa-hourglass-half", label: "Estimated", value: "ESTIMATED" }
                ].map(status => (
                    <div className="status-button" key={status.value}>
                        <button value={status.value} onClick={handleFlightStatusChange}>
                            <p className={status.icon}></p>
                            <p>{status.label}</p>
                        </button>
                    </div>
                ))}
            </div>
            <div className="airport-images">
                {airlines}
            </div>
        </div>
    );
}

export default FilterBar;
