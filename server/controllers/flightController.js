const flightRepository = require('../repositories/flightRepository');
const Flight = require('../models/flight');
const validationHelper = require('./validationHelper');

// FIND ALL
exports.findAll = (req, res) => {
  validationHelper.validation(req, res);

  // This route also accepts any query parameter so live data can be filtered
  flightRepository.getAll(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Flights.',
      });
    else res.send(data);
  });
};

// FIND ONE
exports.findOne = (req, res) => {
  validationHelper.validation(req, res);
  flightRepository.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: 'Not found Flight with FlightNo' + req.params.id,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Flight with FlightNo ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// FIND ALL Departures
exports.findAllDepartures = (req, res) => {
  validationHelper.validation(req, res);

  // This route also accepts any query parameter so live data can be filetered
  flightRepository.getAllDepartingFlights(req.query, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Flights.',
      });
    } else {
      res.send(data);
    }
  });
};

// FIND ALL Arrivals
exports.findAllArrivals = (req, res) => {
  validationHelper.validation(req, res);

  // This route also accepts any query parameter so live data can be filetered
  flightRepository.getAllArrivingFlights(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Flights.',
      });
    else res.send(data);
  });
};

// CREATE
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  validationHelper.validation(req, res);

  // Create a Flight
  const Flight = new Flight(req.body);

  // Save Flight in the database
  flightRepository.create(Flight, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Flight.',
      });
    else res.send(data);
  });
};

// UPDATE ONE
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  validationHelper.validation(req, res);

  flightRepository.updateById(
    req.params.id,
    new Flight(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Flight with FlightNo ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Flight with FlightNo ' + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

// DELETE ONE
exports.delete = (req, res) => {
  validationHelper.validation(req, res);

  flightRepository.remove(req.params.FlightNo, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: 'Not found Flight with FlightNo' + req.params.FlightNo,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete Flight with FlightNo ' + req.params.FlightNo,
        });
      }
    } else res.send({ message: `Flight was deleted successfully!` });
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  validationHelper.validation(req, res);

  flightRepository.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Flights.',
      });
    else res.send({ message: `All Flights were deleted successfully!` });
  });
};
