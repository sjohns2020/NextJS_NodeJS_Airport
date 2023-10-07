const assert = require('assert');
const Flight = require("../models/flights.model");

describe('Flight', function () {

    let flight;

    beforeEach(function () {
        flightObject = {
            FlightNo: "BA8926",
            Date: "2017-03-01T00:00:00.000Z",
            Time: "12:25:00",
            ArrDep: "D",
            PortOfCallA: "SHANNON",
            Status: "LANDED 1232",
            OtherInfo: "NOW ON STAND",
            Additional: "Baggage at carousel 1",
            Airline: "British Airways",
            Image: "https://s3-eu-west-1.amazonaws.com/ediassets/img/airlines/BA.jpg",
            ArrHall: "DOMESTIC"
        }
        flight = new Flight(flightObject);
    });

    it('should have a flightNo', function () {
        const actual = flight.FlightNo;
        assert.strictEqual(actual, "BA8926");
    });
    it('should have a date', function () {
        const actual = flight.Date;
        assert.strictEqual(actual, "2017-03-01T00:00:00.000Z");
    });
    it('should have a time', function () {
        const actual = flight.Time;
        assert.strictEqual(actual, "12:25:00");
    });
    it('should have a flightNo', function () {
        const actual = flight.ArrDep;
        assert.strictEqual(actual, "D");
    });
    it('should have a port of call', function () {
        const actual = flight.PortOfCallA;
        assert.strictEqual(actual, "SHANNON");
    });
    it('should have a status', function () {
        const actual = flight.Status;
        assert.strictEqual(actual, "LANDED 1232");
    });
    it('should have an otherInfo', function () {
        const actual = flight.OtherInfo;
        assert.strictEqual(actual, "NOW ON STAND");
    });
    it('should have an additional info', function () {
        const actual = flight.Additional;
        assert.strictEqual(actual, "Baggage at carousel 1");
    });
    it('should have an airline', function () {
        const actual = flight.Airline;
        assert.strictEqual(actual, "British Airways");
    });
    it('should have an image', function () {
        const actual = flight.Image;
        assert.strictEqual(actual, "https://s3-eu-west-1.amazonaws.com/ediassets/img/airlines/BA.jpg");
    });
    it('should have a arrival hall', function () {
        const actual = flight.ArrHall;
        assert.strictEqual(actual, "DOMESTIC");
    });

});


