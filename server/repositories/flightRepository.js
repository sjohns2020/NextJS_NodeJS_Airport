const db = require('../db/db.js');

// CRUD

// CREATE
exports.create = (newFlight, result) => {
  //Format DATE to be handled by db DATE field, "03\/01\/2017" = '2017-03-01'
  const date = newFlight['Date'];
  const [month, day, year] = date.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  newFlight['Date'] = formattedDate;

  //Format TIME to be handled by db TIME field, "12:30" = "12:30:00"
  const time = newFlight['Time'];
  const [hours, minutes] = time.split(':');
  const formattedTime = `${hours}:${minutes}:00`;
  newFlight['Time'] = formattedTime;

  db.query('INSERT INTO flights SET ?', newFlight, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    result(null, newFlight);
  });
};

// GET ONE
exports.findById = (FlightNo, result) => {
  db.query('SELECT * FROM flights WHERE FlightNo = ?', FlightNo, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Flight with the id
    result({ kind: 'not_found' }, null);
  });
};

// GET ALL FLIGHTS
exports.getAll = (queries, result) => {
  // Basic prepared statement
  let query = 'SELECT * FROM flights';
  let conditions = []; // To store the individual conditions to chain on to the Basic db Query

  // Allow extension to Basic db Query if there are one or more additional Query Parameters
  for (let key in queries) {
    const values = queries[key];
    console.log(values);
    if (values) {
      // if there are any additional Query Parameters
      const condition =
        typeof values === 'string'
          ? `\`${key}\` LIKE '%${values}%'` // If there is only one Query Parameter (and therefore a string)
          : values.map((value) => `\`${key}\` LIKE '%${value}%'`).join(' OR '); // If there are multiple Query Parameters
      conditions.push(`(${condition})`);
    }
  }

  // Allows me to join additional query strings together with AND separating them am adding the WHERE clause right after my initial simple db query
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // SORT the DATA by DATE and TIME (Had to format these to dates as the string format is not sortable)
  query +=
    " ORDER BY STR_TO_DATE(`Date`, '%m/%d/%Y'), STR_TO_DATE(`Time`, '%H:%i')";
  console.log('Query:' + query);

  db.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('flights: ', res);
    result(null, res);
  });
};

// UPDATE
exports.updateById = (FlightNo, flight, result) => {
  db.query(
    'UPDATE flights SET Date = ?, Time = ?, ArrDep = ?, PortOfCallA = ?, Status = ?, OtherInfo = ?, Additional = ?, Airline = ?, Image = ?, ArrHall = ? WHERE FlightNo = ?',
    [
      flight.Date,
      flight.Time,
      flight.ArrDep,
      flight.PortOfCallA,
      flight.Status,
      flight.OtherInfo,
      flight.Additional,
      flight.Airline,
      flight.Image,
      flight.ArrHall,
      FlightNo,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Flight with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      result(null, flight);
    }
  );
};

// DELETE ONE
exports.remove = (FlightNo, result) => {
  db.query('DELETE FROM flights WHERE FlightNo = ?', FlightNo, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Flight with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    result(null, res);
  });
};

// DELETE ALL FLIGHTS
exports.removeAll = (result) => {
  db.query('DELETE FROM flights', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// GET ALL DEPARTING FLIGHTS
exports.getAllDepartingFlights = (queries, result) => {
  // Basic prepared statement
  let query = `SELECT * FROM flights WHERE ArrDep = 'D'`;

  // If there are Query Parameters, this block handles them
  let conditions = [];

  // Allow extension to the Basic db Query if there are one or more Query Parameters
  for (let key in queries) {
    const values = queries[key];
    console.log(values);
    if (values) {
      // if there are any additional Query Parameters
      const condition =
        typeof values === 'string'
          ? `\`${key}\` LIKE '%${values}%'` // if there is only one Query Parameters (and therefore a string)
          : values.map((value) => `\`${key}\` LIKE '%${value}%'`).join(' OR '); // if there are multiple Query Parameters
      conditions.push(`(${condition})`);
    }
  }

  // Allows me to join additional Query Parameters together with AND right after my initial simple db query
  if (conditions.length > 0) {
    query += ' AND ' + conditions.join(' AND ');
  }

  // Orders the output by date and then time (Had to format these to dates as the string format is not sortable)
  query +=
    " ORDER BY STR_TO_DATE(`Date`, '%m/%d/%Y'), STR_TO_DATE(`Time`, '%H:%i')";

  db.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// GET ALL ARRIVAL FLIGHTS
exports.getAllArrivingFlights = (queries, result) => {
  // Basic db prepared statement
  let query = `SELECT * FROM flights WHERE ArrDep = 'A'`;
  let conditions = []; // To store the individual conditions to chain on to the Basic db Query

  // Allow extension to Basic db Query if there are one or more additional Query Parameters
  for (let key in queries) {
    const values = queries[key];
    console.log(values);
    if (values) {
      // If there are any additional Query Parameters
      const condition =
        typeof values === 'string'
          ? `\`${key}\` LIKE '%${values}%'` // If there is only one Query Parameter (and therefore a string)
          : values.map((value) => `\`${key}\` LIKE '%${value}%'`).join(' OR '); // If there are multiple Query Parameters
      conditions.push(`(${condition})`);
    }
  }

  // Allows me to join additional query strings together with AND right after my initial simple db query
  if (conditions.length > 0) {
    query += ' AND ' + conditions.join(' AND ');
  }

  // Orders the output by date and then time (Had to format these to dates as the string format is not sortable)
  query +=
    " ORDER BY STR_TO_DATE(`Date`, '%m/%d/%Y'), STR_TO_DATE(`Time`, '%H:%i')";

  db.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
