import "./CountryList.css"

const CountryList = ({ countries, onCountrySelect }) => {
  return (
    <div className="country-list">
      {countries.length === 0 ? (
        <p className="no-countries">Nenhum país encontrado com os filtros atuais.</p>
      ) : (
        countries.map((country) => (
          <div key={country.name} className="country-card" onClick={() => onCountrySelect(country.name)}>
            <img
              src={country.flag || "/placeholder.svg"}
              alt={`Bandeira de ${country.name}`}
              className="country-flag"
            />
            <h2 className="country-name">{country.name}</h2>
          </div>
        ))
      )}
    </div>
  )
}

export default CountryList
