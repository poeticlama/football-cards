import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export const logToFirebase = async (error: any) => {
  try {
    await addDoc(collection(db, "errors"), {
      message: error.message || String(error),
      stack: error.stack || null,
      level: error.level || "error",
      ts: Date.now(),
      userAgent: navigator.userAgent,
      context: error.context || null,
    });
  } catch (e) {
    console.log("Logging error");
  }
};
