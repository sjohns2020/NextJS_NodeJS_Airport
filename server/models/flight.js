const Flight = function (flight) {
  this.FlightNo = flight.FlightNo;
  this.Date = flight.Date;
  this.Time = flight.Time;
  this.ArrDep = flight.ArrDep;
  this.PortOfCallA = flight.PortOfCallA;
  this.Status = flight.Status;
  this.OtherInfo = flight.OtherInfo;
  this.Additional = flight.Additional;
  this.Airline = flight.Airline;
  this.Image = flight.Image;
  this.ArrHall = flight.ArrHall;
};

module.exports = Flight;
