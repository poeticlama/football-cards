import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"

export type LogLevel = "error" | "warning" | "info"

type LoggableError = {
  message?: string
  stack?: string
  level?: LogLevel
  context?: unknown
}

export const logToFirebase = async (
  error: Error | string | LoggableError,
): Promise<void> => {
  try {
    let message: string
    let stack: string | null = null
    let level: LogLevel = "error"
    let context: unknown = null

    if (typeof error === "string") {
      message = error
    } else if (error instanceof Error) {
      message = error.message
      stack = error.stack || null
    } else {
      message = error.message || "Unknown error"
      stack = error.stack || null
      level = error.level || "error"
      context = error.context || null
    }

    await addDoc(collection(db, "errors"), {
      message,
      stack,
      level,
      ts: Date.now(),
      userAgent: navigator.userAgent,
      context,
    })
  } catch (e) {
    console.log("Logging error:", e)
  }
}
