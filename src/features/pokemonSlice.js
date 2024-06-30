import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemonData = await Promise.all(
    response.data.results.map(async (pokemon) => {
      const details = await axios.get(pokemon.url);
      return {
        name: details.data.name,
        types: details.data.types.map((type) => type.type.name),
        abilities: details.data.abilities.map((ability) => ability.ability.name) // Add abilities here
      };
    })
  );
  return pokemonData;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default pokemonSlice.reducer;
