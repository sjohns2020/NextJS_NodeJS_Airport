import BackButton from "../components/backButton";
import { getFlight } from "../components/flightService";
import "./flight.css"


const Flight = async ({ params }) => {

    const flight = await getFlight(params.id)

    const [hours, minutes] = flight.time.split(":").slice(0, 2);
    const formattedTime = `${hours}:${minutes}`;

    return (
        <main>
            {flight.arrDep === "A"
                ? <h1>Flight details for the {formattedTime} <bold>{flight.airline}</bold> flight arriving from {flight.portOfCallA} airport.</h1>
                : <h1>Flight details for the {formattedTime} {flight.airline} flight to {flight.portOfCallA} airport.</h1>
            }
            <div className="table-container">
                <div className="table">

                    <div className="row">
                        <div><p>Airline</p></div>
                        <div className="airline">
                            <p>{flight.airline}</p>
                            <img src={flight.image} alt={flight.airline}></img>
                        </div>
                    </div>

                    <div className="row">
                        <div><p>Time</p></div>
                        <div>
                            {flight.arrDep === "A"
                                ? <p>Arriving at {formattedTime}</p>
                                : <p>Departing at {formattedTime}</p>
                            }
                        </div>
                    </div>

                    <div className="row">
                        <div><p>Flight No</p></div>
                        <div><p>{flight.flightNo}</p></div>
                    </div>

                    <div className="row">
                        <div>
                            {flight.arrDep === "A"
                                ? <p>From</p>
                                : <p>To</p>
                            }
                        </div>
                        <div><p>{flight.portOfCallA}</p></div>
                    </div>

                    <div className="row">
                        <div><p>Status</p></div>
                        <div><p>{flight.status}</p></div>
                    </div>

                    <div className="row">
                        <div><p>Info</p></div>
                        <div>
                            {flight.otherInfo || flight.additional
                                ? <p>{flight.otherInfo}<br />{flight.additional}</p>
                                : <p>No Update</p>
                            }
                        </div>
                    </div>

                </div>
            </div>
            {/* <button type="button" onClick={() => router.push('/dashboard')}>
                Dashboard
            </button> */}
            <BackButton />
        </main>
    );
}

export default Flight;
