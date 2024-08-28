export class LateCheckInValidate extends Error {
  constructor() {
    super('the check-ind can only validated until 20 minutes of its creation')
  }
}
