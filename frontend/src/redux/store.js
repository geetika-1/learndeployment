import { configureStore } from '@reduxjs/toolkit'
import goalsReducer from './slices/goalsSlice'

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
  },
})


