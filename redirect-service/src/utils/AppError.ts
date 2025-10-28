export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode

    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404)
  }
}
