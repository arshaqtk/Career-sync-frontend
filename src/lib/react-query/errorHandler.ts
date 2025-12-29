import { toast } from "sonner"

type ErrorWithResponse = {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
}

export const handleRQError = (error: unknown) => {
    console.log("called")
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const err = error as ErrorWithResponse

    const statusCode = err.response?.status
    const message = err.response?.data?.message

    // Server error
    if (statusCode === 500) {
      toast.error("Something went wrong. Please try again later.")
      return
    }

    // Show backend message
    if (message) {
      toast.error(message)
      return
    }

    toast.error("An unexpected error occurred.")
  } else {
    toast.error("An unexpected error occurred.")
  }
}