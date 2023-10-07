const express = require("express");
const app = express();
const cors = require("cors") // Eliminating CORS issues
app.use(cors());
app.use(express.json()); // Parse requests into json


//// ROUTES
// API home route
app.get("/", (req, res) => {
    res.json({ message: "Go to /api/flights to see all Flights." });
});

// Created a resueable RESTfull router for any table in the database if the database is extended. 
const createRouter = require("./routes/router.js") 
const flights = require("./controllers/flight.controller.js");
const flightsRouter = createRouter(flights);
app.use('/api/flights', flightsRouter);

// Bespoke routes for Flights outwith the reuseable RESTfull router
// Retrieve all departing Flights
app.use('/api/flights/departures', flights.findAllDepartures)
// Retrieve all arriving Flights
app.use('/api/flights/arrivals', flights.findAllArrivals)



const PORT = process.env.PORT || 8080;
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = server; // Export the HTTP server for testing

