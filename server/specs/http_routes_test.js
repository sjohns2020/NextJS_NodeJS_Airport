const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Import the server, not the app

chai.use(chaiHttp);
const expect = chai.expect;

describe('Flight API', () => {

    //FIND ALL
    describe('GET /api/flights', () => {
        it('should fetch all flight data', (done) => {
            chai.request(server)  // Use the exported server here
                .get('/api/flights')
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').that.is.equal('Some error occurred while retrieving flights.');
                    } else {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array');
                    }

                    done();
                });
        });

    });

    // FIND ONE
    describe('GET /api/flights/flight/EI3672', () => {
        it('should fetch one flight object', (done) => {
            chai.request(server) 
                .get('/api/flights/flight/EI3672')
                .end((err, res) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message').that.is.equal('Not found Flight with FlightNo EI3672');
                        } else {
                            expect(res).to.have.status(500);
                            expect(res.body).to.have.property('Error retrieving Flight with FlightNo EI3672');
                        }
                    }
                    else {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                    }

                    done();
                });
        });
    });

    // FIND ALL DEPARTURES
    describe('GET /api/flights/departures', () => {
        it('should fetch all departure flight data', (done) => {
            chai.request(server) 
                .get('/api/flights/departures')
                .end((err, res) => {
                   if (err) {
                            expect(res).to.have.status(500);
                            expect(res.body).to.have.property('message').that.is.equal('Some error occurred while retrieving flights.');
                        } else {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.an('array');
                            for (const key of res.body) {
                                expect(key["arrDep"]).to.equal("D")
                            }
                        }
                    done();
                });
        });
    });

        // FIND ALL ARRIVALS
        describe('GET /api/flights/arrivals', () => {
            it('should fetch all arrival flight data ', (done) => {
                chai.request(server) 
                    .get('/api/flights/arrivals')
                    .end((err, res) => {
                       if (err) {
                                expect(res).to.have.status(500);
                                expect(res.body).to.have.property('message').that.is.equal('Some error occurred while retrieving flights.');
                            } else {
                                expect(res).to.have.status(200);
                                expect(res.body).to.be.an('array');
                                for (const key of res.body) {
                                    expect(key["arrDep"]).to.equal("A")
                                }
                            }
                        done();
                    });
            });
        });


});
