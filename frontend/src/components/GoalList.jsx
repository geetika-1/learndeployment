import GoalItem from './GoalItem'

function GoalList({ goals, onIncrement, onDelete }) {
  return (
    <ul className="list">
      {goals.map(g => (
        <GoalItem key={g.id} goal={g} onIncrement={onIncrement} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default GoalList


