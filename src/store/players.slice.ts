import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../../firebase"
import type { PlayersStateType, PlayerType } from "../types"
import rollbar from "../../rollbar"
import type { RootState } from "./index"

const initialState: PlayersStateType = {
  players: [],
  currentPlayer: null,
  loading: false,
  error: null,
  sortBy: "default",
}

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (_, { getState }) => {
    const state = getState() as RootState
    const uid = state.auth.user?.uid
    if (!uid) {
      throw new Error("User not authenticated")
    }

    const playersRef = collection(db, "users", uid, "players")
    const querySnapshot = await getDocs(playersRef)
    if (querySnapshot.empty) {
      return []
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as PlayerType[]
  },
)

export const addPlayer = createAsyncThunk(
  "players/addPlayer",
  async (player: Omit<PlayerType, "id">, { getState }) => {
    const state = getState() as RootState
    const uid = state.auth.user?.uid
    if (!uid) {
      throw new Error("User not authenticated")
    }
    await addDoc(collection(db, "users", uid, "players"), player)
  },
)

export const deletePlayer = createAsyncThunk(
  "players/deletePlayer",
  async (id: string, { getState }) => {
    const state = getState() as RootState
    const uid = state.auth.user?.uid
    if (!uid) {
      throw new Error("User not authenticated")
    }
    await deleteDoc(doc(db, "users", uid, "players", id))
  },
)

export const updatePlayer = createAsyncThunk(
  "players/updatePlayer",
  async (player: PlayerType, { getState }) => {
    const state = getState() as RootState
    const uid = state.auth.user?.uid
    if (!uid) {
      throw new Error("User not authenticated")
    }
    const docRef = doc(db, "users", uid, "players", player.id)
    await updateDoc(docRef, { ...player })
    return player
  },
)

export const fetchPlayerById = createAsyncThunk(
  "players/fetchById",
  async (id: string | undefined, { getState }) => {
    const state = getState() as RootState
    const uid = state.auth.user?.uid
    if (!uid) {
      throw new Error("User not authenticated")
    }
    if (!id) return null
    const docRef = doc(db, "users", uid, "players", id)
    const docSnap = await getDoc(docRef)

    return { id: id, ...docSnap.data() } as PlayerType
  },
)

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload

      switch (state.sortBy) {
        case "rating":
          state.players = [...state.players].sort((a, b) => b.rating - a.rating)
          break
        case "matches":
          state.players = [...state.players].sort(
            (a, b) => b.matches - a.matches,
          )
          break
        case "goals":
          state.players = [...state.players].sort((a, b) => b.goals - a.goals)
          break
        case "assists":
          state.players = [...state.players].sort(
            (a, b) => b.assists - a.assists,
          )
          break
        default:
          break
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlayers.pending, state => {
        state.loading = true
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<PlayerType[]>) => {
          state.loading = false
          state.players = action.payload
        },
      )
      .addCase(fetchPlayers.rejected, state => {
        state.loading = false
        state.error = "Error fetching players"
        rollbar.error(state.error)
      })
      .addCase(fetchPlayerById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.loading = false
        state.currentPlayer = action.payload
      })
      .addCase(fetchPlayerById.rejected, state => {
        state.loading = false
        state.error = "Error fetching player"
        rollbar.error(state.error)
      })
      .addCase(updatePlayer.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.loading = false
        state.currentPlayer = action.payload
        state.players = state.players.map(p =>
          p.id === action.payload.id ? action.payload : p,
        )
      })
      .addCase(updatePlayer.rejected, state => {
        state.loading = false
        state.error = "Error updating player"
        rollbar.error(state.error)
      })
  },
})

export const { setSortBy } = playersSlice.actions
export default playersSlice.reducer
