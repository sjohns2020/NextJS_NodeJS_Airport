const sql = require("../db/db.js");
// Constructor Function

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

// Methods to give the flight objects methods to perform CRUD actions within the flights table in our flights database. 

// CREATE
Flight.create = (newFlight, result) => {

    //Format DATE to be handled by SQL DATE field, "03\/01\/2017" = '2017-03-01'
    const date = newFlight["Date"]
    const [month, day, year] = date.split("/")
    const formattedDate = `${year}-${month}-${day}`
    newFlight["Date"] = formattedDate;

    //Format TIME to be handled by SQL TIME field, "12:30" = "12:30:00"
    const time = newFlight["Time"];
    const [hours, minutes] = time.split(":");
    const formattedTime = `${hours}:${minutes}:00`;
    newFlight["Time"] = formattedTime;

    sql.query("INSERT INTO flights SET ?", newFlight, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created flight: ", newFlight);
        result(null, newFlight);
    });
};

// GET ONE
Flight.findById = (FlightNo, result) => {
    sql.query("SELECT * FROM flights WHERE FlightNo = ?", FlightNo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found flight: ", res[0]);
            result(null, res[0]);
            return;
        }
    
        // not found Flight with the id
        result({ kind: "not_found" }, null);
    });
};

// GET ALL FLIGHTS
Flight.getAll = (queries, result) => {
    console.log("QUERIES", queries);

    ////////////////BUILDING THE SQL QUERY////////////////

    // Basic SQL Query
    let query = "SELECT * FROM flights";
    let conditions = []; // To store the individual conditions to chain on to the Basic SQL Query

    // Allow extension to Basic SQL Query if there are one or more additional Query Parameters
    for (let key in queries) {
        const values = queries[key];
        console.log(values)
        if (values) { // if there are any additional Query Parameters
            const condition = (typeof values === 'string')
                ? `\`${key}\` LIKE '%${values}%'` // If there is only one Query Parameter (and therefore a string)
                : values.map(value => `\`${key}\` LIKE '%${value}%'`).join(" OR "); // If there are multiple Query Parameters
            conditions.push(`(${condition})`);
        }
    }

    // Allows me to join additional query strings together with AND separating them am adding the WHERE clause right after my initial simple SQL query
    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    // SORT the DATA by DATE and TIME (Had to format these to dates as the string format is not sortable)
    query += " ORDER BY STR_TO_DATE(`Date`, '%m/%d/%Y'), STR_TO_DATE(`Time`, '%H:%i')";
    console.log("Query:" + query);
    //////////////////////////////////////////////

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
   
        console.log("flights: ", res);
        result(null, res);
    });
};

// UPDATE
Flight.updateById = (FlightNo, flight, result) => {
    sql.query(
        "UPDATE flights SET Date = ?, Time = ?, ArrDep = ?, PortOfCallA = ?, Status = ?, OtherInfo = ?, Additional = ?, Airline = ?, Image = ?, ArrHall = ? WHERE FlightNo = ?",
        [flight.Date, flight.Time, flight.ArrDep, flight.PortOfCallA, flight.Status, flight.OtherInfo, flight.Additional, flight.Airline, flight.Image, flight.ArrHall, FlightNo],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Flight with the id
                result({ kind: "not_found" }, null);
                return;
            }
         
            console.log("updated flight: ", flight);
            result(null, flight);
        }
    );
};

// DELETE ONE
Flight.remove = (FlightNo, result) => {
    sql.query("DELETE FROM flights WHERE FlightNo = ?", FlightNo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Flight with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted flight with FlightNo: ", FlightNo);
        result(null, res);
    });
};

// DELETE ALL FLIGHTS
Flight.removeAll = result => {
    sql.query("DELETE FROM flights", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log(`deleted ${res.affectedRows} flights`);
        result(null, res);
    });
};

// GET ALL DEPARTING FLIGHTS
Flight.getAllDepartingFlights = (queries, result) => {

    ////////////////BUILDING THE SQL QUERY////////////////
    // Basic SQL Query
    let query = `SELECT * FROM flights WHERE ArrDep = 'D'`;

    // If there are Query Parameters, this block handles them
    let conditions = [];

    // Allow extension to the Basic SQL Query if there are one or more Query Parameters
    for (let key in queries) {
        const values = queries[key];
        console.log(values)
        if (values) { // if there are any additional Query Parameters
            const condition = (typeof values === 'string')
                ? `\`${key}\` LIKE '%${values}%'` // if there is only one Query Parameters (and therefore a string)
                : values.map(value => `\`${key}\` LIKE '%${value}%'`).join(" OR "); // if there are multiple Query Parameters
            conditions.push(`(${condition})`);
        }
    }

    // Allows me to join additional Query Parameters together with AND right after my initial simple SQL query
    if (conditions.length > 0) {
        query += " AND " + conditions.join(" AND ");
    }

    // Orders the output by date and then time (Had to format these to dates as the string format is not sortable)
    query += " ORDER BY STR_TO_DATE(`Date`, '%m/%d/%Y'), STR_TO_DATE(`Time`, '%H:%i')";
    /////////////SQL QUERY IS NOW READY///////////////////

    console.log("Query:" + query);

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
   
        console.log("flights: ", res);
        result(null, res);
    });
};

// GET ALL ARRIVAL FLIGHTS
Flight.getAllArrivingFlights = (queries, result) => {

    ////////////////BUILDING THE SQL QUERY////////////////
    // Basic SQL Query
    let query = `SELECT * FROM flights WHERE ArrDep = 'A'`;
    let conditions = []; // To store the individual conditions to chain on to the Basic SQL Query

    // Allow extension to Basic SQL Query if there are one or more additional Query Parameters
    for (let key in queries) {
        const values = queries[key];
        console.log(values)
        if (values) { // If there are any additional Query Parameters
            const condition = (typeof values === 'string')
                ? `\`${key}\` LIKE '%${values}%'` // If there is only one Query Parameter (and therefore a string)
                : values.map(value => `\`${key}\` LIKE '%${value}%'`).join(" OR "); // If there are multiple Query Parameters
            conditions.push(`(${condition})`);
        }
    }

    // Allows me to join additional query strings together with AND right after my initial simple SQL query
    if (conditions.length > 0) {
        query += " AND " + conditions.join(" AND ");
    }

    // Orders the output by date and then time (Had to format these to dates as the string format is not sortable)
    query += " ORDER BY STR_TO_DATE(`Date`, '%m/%d/%Y'), STR_TO_DATE(`Time`, '%H:%i')";
    //////////////////////////////////////////////

    console.log("Query:" + query);

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
       
        console.log("flights: ", res);
        result(null, res);
    });
};



module.exports = Flight;