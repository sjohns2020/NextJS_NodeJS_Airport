// The controller handles the request and response from the client. 
const Flight = require("../models/flights.model");


// FIND ALL
exports.findAll = (req, res) => {
  // This code is to help prevent SQL injection attacks by erroring if illegal characters are used.
  const alphanumericPattern = /^[A-Za-z0-9]+$/;
  for (const key in req.query) {
    const value = req.query[key];
    if (!value.match(alphanumericPattern)) {
      return res.status(400).json({ err: `Invalid input in query parameter "${key}". "${value}" contains illegal characters. Only letters and digits are allowed.` });
    }
  }
  // This route also accepts any query parameter so live data can be filetered
  Flight.getAll(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flights."
      });
    else res.send(data);
  });
};


// FIND ONE
exports.findOne = (req, res) => {
  Flight.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Flight with FlightNo" + req.params.id
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flight with FlightNo " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// FIND ALL Departures
exports.findAllDepartures = (req, res) => {
  // This code is to help prevent SQL injection attacks by erroring if illegal characters are used.
  const alphanumericPattern = /^[A-Za-z0-9]+$/;
  for (const key in req.query) {
    const value = req.query[key];
    if (!value.match(alphanumericPattern)) {
      return res.status(400).json({ err: `Invalid input in query parameter "${key}". "${value}" contains illegal characters. Only letters and digits are allowed.` });
  }}
  // This route also accepts any query parameter so live data can be filetered
  Flight.getAllDepartingFlights(req.query, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving flights."
      });
    } else {
      res.send(data);
    };
  });
};


// FIND ALL Arrivals
exports.findAllArrivals = (req, res) => {
  // This code is to help prevent SQL injection attacks by erroring if illegal characters are used.
  const alphanumericPattern = /^[A-Za-z0-9]+$/;
  for (const key in req.query) {
    const value = req.query[key];
    if (!value.match(alphanumericPattern)) {
      return res.status(400).json({ err: `Invalid input in query parameter "${key}". "${value}" contains illegal characters. Only letters and digits are allowed.` });
    }
  }
  // This route also accepts any query parameter so live data can be filetered
  Flight.getAllArrivingFlights(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flights."
      });
    else res.send(data);
  });
};


// CREATE
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Flight
  const flight = new Flight(req.body);

  // Save Flight in the database
  Flight.create(flight, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Flight."
      });
    else res.send(data);
  });
};


// UPDATE ONE
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Flight.updateById(
    req.params.id,
    new Flight(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Flight with FlightNo ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Flight with FlightNo " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// DELETE ONE
exports.delete = (req, res) => {
  Flight.remove(req.params.FlightNo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Flight with FlightNo" + req.params.FlightNo
        });
      } else {
        res.status(500).send({
          message: "Could not delete Flight with FlightNo " + req.params.FlightNo
        });
      }
    } else res.send({ message: `Flight was deleted successfully!` });
  });
};


// DELETE ALL
exports.deleteAll = (req, res) => {
  Flight.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all flights."
      });
    else res.send({ message: `All Flights were deleted successfully!` });
  });
};







