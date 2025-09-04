function GoalItem({ goal, onIncrement, onDelete }) {
  return (
    <li>
      <b>{goal.name}</b> — {goal.target} {goal.unit}
      <div className="actions">
        <button onClick={() => onIncrement(goal.id)}>+500</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </li>
  )
}

export default GoalItem


