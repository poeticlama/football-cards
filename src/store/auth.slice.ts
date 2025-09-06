import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import rollbar from "../../rollbar"
import { db } from "../../firebase"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"
import type { UserDataType } from "../types"
import examplePlayer from "../constants/examplePlayer"

type LoginArgs = {
  username: string
  password: string
}

type AuthState = {
  user: { uid: string | null; username: string | null } | null
  loading: boolean
  error: string | null
  initialized: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }: LoginArgs, { rejectWithValue }) => {
    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("username", "==", username))

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return rejectWithValue("User not found")
      }
      const userDoc = querySnapshot.docs[0]
      const docData = userDoc.data() as UserDataType | null

      if (!docData) return rejectWithValue("Unauthorized")

      if (docData?.password === password) {
        return { uid: userDoc.id, username: docData.username }
      } else {
        rejectWithValue("Wrong password")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue("Unknown error")
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("uid")
  localStorage.removeItem("username")
  return null
})

export const initAuthListener = createAsyncThunk("auth/init", async () => {
  const uid = localStorage.getItem("uid")
  const username = localStorage.getItem("username")
  if (!uid && !username) return null
  else {
    return { uid, username }
  }
})

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, password }: LoginArgs, { rejectWithValue }) => {
    const user = {
      username,
      password,
    }
    try {
      const userRef = await addDoc(collection(db, "users"), user)
      const uid = userRef.id
      await addDoc(collection(db, "users", uid, "players"), examplePlayer)

      return { uid, username }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      } else {
        return rejectWithValue("Unknown error")
      }
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.user = action.payload
          localStorage.setItem("uid", String(state.user.uid))
          localStorage.setItem("username", String(state.user.username))
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        rollbar.error("Login failed", state.error)
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
      })
      .addCase(initAuthListener.fulfilled, (state, action) => {
        state.user = action.payload
        state.initialized = true
      })
      .addCase(registerUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
        if (action.payload) {
          state.user = action.payload
          localStorage.setItem("uid", String(state.user.uid))
          localStorage.setItem("username", String(state.user.username))
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        rollbar.error("Register failed", state.error)
      })
  },
})

export default authSlice.reducer
