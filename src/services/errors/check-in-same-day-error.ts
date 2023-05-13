export class MaxCheckInSameDayError extends Error {
  constructor() {
    super('Max number of check ins reached.')
  }
}
