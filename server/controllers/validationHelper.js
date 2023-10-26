// This function validates client requests preventing SQL attacks
exports.validation = (req, res) => {
  const alphanumericSpacePattern = /^[A-Za-z0-9 ]+$/; // URL Validation - preventing SQL Injection Attacks
  for (const key in req.query) {
    // Decode the URI component first. This turns %20 back into ' '.
    const value = decodeURIComponent(req.query[key]);
    if (!value.match(alphanumericSpacePattern)) {
      return res.status(400).json({
        err: `Invalid input in query parameter "${key}". "${value}" contains illegal characters. Only letters, digits, and spaces are allowed.`,
      });
    }
  }
};
