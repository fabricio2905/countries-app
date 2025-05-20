import "./FilterBar.css"

const FilterBar = ({ onFilterChange }) => {
  const regions = [
    { value: "all", label: "Todos" },
    { value: "África", label: "África" },
    { value: "Américas", label: "Américas" },
    { value: "Ásia", label: "Ásia" },
    { value: "Europa", label: "Europa" },
    { value: "Oceania", label: "Oceania" },
    { value: "Antártida", label: "Antártida" },
  ]

  return (
    <div className="filter-bar">
      <label htmlFor="region-filter">Filtrar por Continente:</label>
      <select id="region-filter" onChange={(e) => onFilterChange(e.target.value)} defaultValue="all">
        {regions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar
