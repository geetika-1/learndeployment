import GoalItem from './GoalItem'

function GoalList({ goals, onIncrement, onDelete, onUpdate, disabled = false }) {
  return (
    <ul className="list">
      {goals.map(g => (
        <GoalItem 
          key={g.id} 
          goal={g} 
          onIncrement={onIncrement} 
          onDelete={onDelete} 
          onUpdate={onUpdate}
          disabled={disabled}
        />
      ))}
    </ul>
  )
}

export default GoalList


