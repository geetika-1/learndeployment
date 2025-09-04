import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGoals, createGoal as createGoalThunk, updateGoal as updateGoalThunk, deleteGoal as deleteGoalThunk } from './redux/slices/goalsSlice'
import GoalForm from './components/GoalForm'
import GoalList from './components/GoalList'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { items: goals, status, error } = useSelector(state => state.goals)

  useEffect(() => {
    dispatch(fetchGoals())
  }, [dispatch])

  async function onCreate(payload) {
    await dispatch(createGoalThunk(payload))
  }

  async function updateGoal(id, updates) {
    await dispatch(updateGoalThunk({ id, updates }))
  }

  async function deleteGoal(id) {
    await dispatch(deleteGoalThunk(id))
  }

  return (
    <div className="container">
      <h1>Health Goals</h1>
      <p>State: {status}</p>
      <GoalForm onCreate={onCreate} />
      {error && <div className="error">{error}</div>}
      {status === 'loading' ? <div>Loading...</div> : (
        <GoalList
          goals={goals}
          onIncrement={(id) => updateGoal(id, { target: (goals.find(g=>g.id===id)?.target || 0) + 500 })}
          onDelete={(id) => deleteGoal(id)}
        />
      )}
    </div>
  )
}

export default App
