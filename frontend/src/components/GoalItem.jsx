import { useState } from 'react'

function GoalItem({ goal, onIncrement, onDelete, onUpdate, disabled = false }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: goal.name,
    target: goal.target,
    unit: goal.unit
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate(goal.id, editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      name: goal.name,
      target: goal.target,
      unit: goal.unit
    })
    setIsEditing(false)
  }

  const handleIncrement = () => {
    onUpdate(goal.id, { target: goal.target + 500 })
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${goal.name}"?`)) {
      onDelete(goal.id)
    }
  }

  if (isEditing) {
    return (
      <li className="goal-item editing">
        <div className="edit-form">
          <input
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Goal name"
            required
          />
          <input
            type="number"
            value={editForm.target}
            onChange={(e) => setEditForm({ ...editForm, target: Number(e.target.value) })}
            placeholder="Target"
            required
          />
          <select
            value={editForm.unit}
            onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
          >
            <option value="steps">steps</option>
            <option value="km">km</option>
            <option value="minutes">minutes</option>
            <option value="calories">calories</option>
          </select>
        </div>
        <div className="actions">
          <button onClick={handleSave} className="save-btn" disabled={disabled}>Save</button>
          <button onClick={handleCancel} className="cancel-btn" disabled={disabled}>Cancel</button>
        </div>
      </li>
    )
  }

  return (
    <li className="goal-item">
      <div className="goal-content">
        <b>{goal.name}</b> — {goal.target} {goal.unit}
      </div>
      <div className="actions">
        <button onClick={handleIncrement} className="increment-btn" disabled={disabled}>+500</button>
        <button onClick={handleEdit} className="edit-btn" disabled={disabled}>Edit</button>
        <button onClick={handleDelete} className="delete-btn" disabled={disabled}>Delete</button>
      </div>
    </li>
  )
}

export default GoalItem


