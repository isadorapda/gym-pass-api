export class ExpiredCheckInValidationError extends Error {
  constructor() {
    super('Unable to validate expired check in.')
  }
}
