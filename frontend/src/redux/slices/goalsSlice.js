import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export const fetchGoals = createAsyncThunk('goals/fetchAll', async () => {
  const res = await fetch(`${API_BASE}/api/health-goals`)
  if (!res.ok) throw new Error('Failed to fetch')
  return await res.json()
})

export const createGoal = createAsyncThunk('goals/create', async (payload) => {
  const res = await fetch(`${API_BASE}/api/health-goals`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Failed to create')
  return await res.json()
})

export const updateGoal = createAsyncThunk('goals/update', async ({ id, updates }) => {
  const res = await fetch(`${API_BASE}/api/health-goals/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates)
  })
  if (!res.ok) throw new Error('Failed to update')
  return await res.json()
})

export const deleteGoal = createAsyncThunk('goals/delete', async (id) => {
  const res = await fetch(`${API_BASE}/api/health-goals/${id}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 204) throw new Error('Failed to delete')
  return id
})

const goalsSlice = createSlice({
  name: 'goals',
  initialState: { items: [], status: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => { state.status = 'loading'; state.error = '' })
      .addCase(fetchGoals.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchGoals.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message || 'Error' })
      .addCase(createGoal.fulfilled, (state, action) => { state.items.push(action.payload) })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const idx = state.items.findIndex(g => g.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.items = state.items.filter(g => g.id !== action.payload)
      })
  }
})

export default goalsSlice.reducer


