const express = require('express');
const app = express();
const cors = require('cors'); // Eliminating CORS issues
app.use(cors());
app.use(express.json()); // Parse requests into json

// API home route
app.get('/', (req, res) => {
  res.json({ message: 'Go to /api/flights to see all Flight data.' });
});

// Reuseable RESTfull router for flights
const createRouter = require('./routes/router.js');
const flights = require('./controllers/flightController.js');
const flightsRouter = createRouter(flights);
app.use('/api/flights', flightsRouter);

// Retrieve all departing Flights
app.use('/api/flights/departures', flights.findAllDepartures);
// Retrieve all arriving Flights
app.use('/api/flights/arrivals', flights.findAllArrivals);

// Handles wrong endpoints being reached
app.use('*', (req, res) => {
  res
    .status(404)
    .json({ message: 'Not Found - Invalid endpoint or HTTP method' });
});

const PORT = process.env.PORT || 8080;
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;
