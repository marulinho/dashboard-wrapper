class ApplicationError extends Error {
  constructor({ message, status }) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.message = message || "Error in service";
    this.status = status || 500;
  }
}
module.exports = ApplicationError;
