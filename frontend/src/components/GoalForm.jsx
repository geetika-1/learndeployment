import { useState } from 'react'

function GoalForm({ onCreate }) {
  const [form, setForm] = useState({ name: '', target: '', unit: 'steps' })

  async function handleSubmit(e) {
    e.preventDefault()
    await onCreate({ name: form.name, target: Number(form.target), unit: form.unit })
    setForm({ name: '', target: '', unit: 'steps' })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Target" type="number" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} required />
      <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
        <option value="steps">steps</option>
        <option value="km">km</option>
        <option value="minutes">minutes</option>
        <option value="calories">calories</option>
      </select>
      <button type="submit">Add</button>
    </form>
  )
}

export default GoalForm


