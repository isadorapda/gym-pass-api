export class MaxDistanceError extends Error {
  constructor() {
    super('Distance superior to the maximum distance allowed')
  }
}
