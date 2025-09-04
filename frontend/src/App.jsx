import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGoals, createGoal as createGoalThunk, updateGoal as updateGoalThunk, deleteGoal as deleteGoalThunk } from './redux/slices/goalsSlice'
import GoalForm from './components/GoalForm'
import GoalList from './components/GoalList'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { items: goals, status, error } = useSelector(state => state.goals)
  const [operationStatus, setOperationStatus] = useState('idle')

  useEffect(() => {
    dispatch(fetchGoals())
  }, [dispatch])

  async function onCreate(payload) {
    setOperationStatus('creating')
    try {
      await dispatch(createGoalThunk(payload))
    } finally {
      setOperationStatus('idle')
    }
  }

  async function updateGoal(id, updates) {
    setOperationStatus('updating')
    try {
      await dispatch(updateGoalThunk({ id, updates }))
    } finally {
      setOperationStatus('idle')
    }
  }

  async function deleteGoal(id) {
    setOperationStatus('deleting')
    try {
      await dispatch(deleteGoalThunk(id))
    } finally {
      setOperationStatus('idle')
    }
  }

  return (
    <div className="container">
      <h1>Health Goals</h1>
      <p>State: {status}</p>
      {operationStatus !== 'idle' && (
        <div className="operation-status">
          {operationStatus === 'creating' && 'Creating goal...'}
          {operationStatus === 'updating' && 'Updating goal...'}
          {operationStatus === 'deleting' && 'Deleting goal...'}
        </div>
      )}
      <GoalForm onCreate={onCreate} disabled={operationStatus !== 'idle'} />
      {error && <div className="error">{error}</div>}
      {status === 'loading' ? <div>Loading...</div> : (
        <GoalList
          goals={goals}
          onIncrement={(id) => updateGoal(id, { target: (goals.find(g=>g.id===id)?.target || 0) + 500 })}
          onDelete={(id) => deleteGoal(id)}
          onUpdate={(id, updates) => updateGoal(id, updates)}
          disabled={operationStatus !== 'idle'}
        />
      )}
    </div>
  )
}

export default App
