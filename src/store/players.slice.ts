import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { PlayersStateType, PlayerType } from '../types';

const initialState: PlayersStateType = {
  players: [],
  currentPlayer: null,
  loading: false,
  error: null,
}

export const fetchPlayers = createAsyncThunk("players/fetchPlayers", async () => {
  const querySnapshot = await getDocs(collection(db, "players"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PlayerType[];
});

export const addPlayer = createAsyncThunk("players/addPlayer", async (player: Omit<PlayerType, "id">) => {
  await addDoc(collection(db, "players"), player);
});

export const deletePlayer = createAsyncThunk("players/deletePlayer", async (id: string) => {
  await deleteDoc(doc(db, "players", id));
});

export const fetchPlayerById = createAsyncThunk("players/fetchById", async (id: string | undefined) => {
  if (!id) return null;
  const docRef = doc(db, "players", id);
  const docSnap = await getDoc(docRef);

  return { id: id, ...docSnap.data() } as PlayerType;
});

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => { state.loading = true; })
      .addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<PlayerType[]>) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching players";
      })
      .addCase(fetchPlayerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlayer = action.payload;
      })
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error fetching player";
      });
    ;
  },
});

export default playersSlice.reducer;
