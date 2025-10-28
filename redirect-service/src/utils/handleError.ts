import { AppError } from "./AppError"


const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error 
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500)
  }

  return new AppError(String(error), 500)
}

export default handleError
