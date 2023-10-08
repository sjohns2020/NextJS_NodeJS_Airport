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
        ? <h1 className="items-2xl font-bold mb-6">Flight details for the {formattedTime} <span className="font-black">{flight.airline}</span> flight arriving from {flight.portOfCallA} airport.</h1>
        : <h1 className="items-2xl font-bold mb-6">Flight details for the {formattedTime} {flight.airline} flight to {flight.portOfCallA} airport.</h1>
    }
    <div className="details-table-container bg-white shadow-lg rounded-lg p-8">
        <div className="details-table">

            <div className="row flex border-b border-gray-300 py-4 items-center">
                <div className="w-1/3 font-semibold">Airline</div>
                <div className="airline flex items-center justify-center">
                    <p className="mr-4">{flight.airline}</p>
                    <img src={flight.image} alt={flight.airline} className="h-10 w-auto" />
                </div>
            </div>

            <div className="row flex border-b border-gray-300 py-4 items-center">
                <div className="w-1/3 font-semibold">Time</div>
                <div className="flex items-center justify-center">
                    {flight.arrDep === "A"
                        ? <p>Arriving at {formattedTime}</p>
                        : <p>Departing at {formattedTime}</p>
                    }
                </div>
            </div>

            <div className="row flex border-b border-gray-300 py-4 items-center">
                <div className="w-1/3 font-semibold">Flight No</div>
                <div className="flex items-center justify-center">
                    <p>{flight.flightNo}</p>
                </div>
            </div>

            <div className="row flex border-b border-gray-300 py-4 items-center">
                <div className="w-1/3 font-semibold">
                    {flight.arrDep === "A"
                        ? <p>From</p>
                        : <p>To</p>
                    }
                </div>
                <div className="flex items-center justify-center">
                    <p>{flight.portOfCallA}</p>
                </div>
            </div>

            <div className="row flex border-b border-gray-300 py-4 items-center">
                <div className="w-1/3 font-semibold">Status</div>
                <div className="flex items-center justify-center">
                    <p>{flight.status}</p>
                </div>
            </div>

            <div className="row flex py-4 items-center">
                <div className="w-1/3 font-semibold">Info</div>
                <div className="flex items-center justify-center">
                    {flight.otherInfo || flight.additional
                        ? <p>{flight.otherInfo} {"->"} {flight.additional}</p>
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
