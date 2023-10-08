import { getAllFlightIds } from "../components/flightService";
import { getFlight } from "../components/flightService";
import "./flight.css"

// Rendering dynamic paths for all flights with a flight ID
export async function getStaticPaths() {
    const paths = await getAllFlightIds();
    return {
        paths,
        fallback: false,
    };
}

const Flight = async ({ params }) => {
    console.log(params)
    const flight = await getFlight(params.id)

    console.log(flight)

    const [hours, minutes] = flight.time.split(":").slice(0, 2);
    const formattedTime = `${hours}:${minutes}`;

    return (
        <main>
            { flight.arrDep === "A" 
            ? <h1 className="pageTitle">Flight details for the {formattedTime} <i>{flight.airline}</i> flight arriving from {flight.portOfCallA} airport.</h1>

            : <h1 className="pageTitle">Flight details for the {formattedTime} {flight.airline} flight to {flight.portOfCallA} airport.</h1>

            }
            <div className="table-row-expanded-container">
                <div className="table-row-expanded-table">

                    <div className="table-row-expanded-row">
                        <div className="table-row-expanded-row-title">
                            <p>Airline</p>
                        </div>
                        <div className="table-row-expanded-row-data">
                            <p>{flight.airline}</p>
                        </div>
                    </div>

                    <div className="table-row-expanded-row">
                        <div className="table-row-expanded-row-title">
                            <p>Time</p>
                        </div>
                        <div className="table-row-expanded-row-data">
                            {flight.arrDep === "A"
                                ? <p  >Arriving at {formattedTime}</p>
                                : <p >Departing at {formattedTime}</p>}
                        </div>
                    </div>

                    <div className="table-row-expanded-row">
                        <div className="table-row-expanded-row-title">
                            <p>Flight No</p>
                        </div>
                        <div className="table-row-expanded-row-data">
                            <p>{flight.flightNo}</p>
                        </div>
                    </div>

                    <div className="table-row-expanded-row">
                        <div className="table-row-expanded-row-title">
                            {flight.arrDep === "A"
                                ? <p data-testid="get-arr" >From</p>
                                : <p data-testid="get-dep" >To</p>}
                        </div>
                        <div className="table-row-expanded-row-data">
                            <p>{flight.portOfCallA}</p>
                        </div>
                    </div>

                    <div className="table-row-expanded-row">
                        <div className="table-row-expanded-row-title">
                            <p>Status</p>
                        </div>
                        <div className="table-row-expanded-row-data">
                            <p data-testid="check-status">{flight.status}</p>
                        </div>
                    </div>

                    <div className="table-row-expanded-row">
                        <div className="table-row-expanded-row-title">
                            <p>Info</p>
                        </div>
                        <div className="table-row-expanded-row-data">
                            {flight.otherInfo || flight.additional
                                ? <p>{flight.otherInfo}<br />{flight.additional}</p>
                                : <p>No Update</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Flight;