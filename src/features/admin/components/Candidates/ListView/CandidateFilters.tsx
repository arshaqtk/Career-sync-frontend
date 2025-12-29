export function CandidateFilters() {
  return (
    <div className="flex gap-3 mb-4">
      <input
        className="input"
        placeholder="Search by name or email"
      />
      <select className="input">
        <option>Status</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
      <select className="input">
        <option>Skill</option>
        <option>React</option>
        <option>Node</option>
      </select>
    </div>
  )
}
