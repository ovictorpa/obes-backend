class BadRequest extends Error {
  constructor(message, errors = []) {
    super(message);
    this.statusCode = 400;
    this.errors = errors;
  }
}

module.exports = BadRequest;
