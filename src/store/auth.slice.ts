import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { User } from "firebase/auth"
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

type AuthState = {
  user: { uid: string; email: string | null } | null
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
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const auth = getAuth()
      const res = await signInWithEmailAndPassword(auth, email, password)
      const user: User = res.user

      return { uid: user.uid, email: user.email }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue("Unknown error")
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const auth = getAuth()
  await signOut(auth)
  return null
})

export const initAuthListener = createAsyncThunk("auth/init", async () => {
  const auth = getAuth()

  return new Promise<{ uid: string; email: string | null } | null>(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve({ uid: user.uid, email: user.email })
      } else {
        resolve(null)
      }
    })
  })
})

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
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
      })
      .addCase(initAuthListener.fulfilled, (state, action) => {
        state.user = action.payload
        state.initialized = true
      })
  },
})

export default authSlice.reducer
