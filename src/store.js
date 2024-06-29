// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './features/pokemonSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    cart: cartReducer,
  },
});
