import "./CountryDetail.css"

const CountryDetail = ({ country, onBack }) => {
  return (
    <div className="country-detail">
      <button className="back-button" onClick={onBack}>
        &larr; Voltar para lista
      </button>

      <div className="detail-content">
        <div className="flag-container">
          <img src={country.flag || "/placeholder.svg"} alt={`Bandeira de ${country.name}`} className="detail-flag" />
        </div>

        <div className="detail-info">
          <h2>{country.name}</h2>

          <div className="info-grid">
            <div className="info-item">
              <span className="label">Nome Local:</span>
              <span className="value">{country.nativeName || "Não disponível"}</span>
            </div>

            <div className="info-item">
              <span className="label">Capital:</span>
              <span className="value">{country.capital || "Não disponível"}</span>
            </div>

            <div className="info-item">
              <span className="label">População:</span>
              <span className="value">{country.population.toLocaleString("pt-BR")}</span>
            </div>

            <div className="info-item">
              <span className="label">Região:</span>
              <span className="value">{country.region}</span>
            </div>

            <div className="info-item">
              <span className="label">Área:</span>
              <span className="value">
                {country.area ? `${country.area.toLocaleString("pt-BR")} km²` : "Não disponível"}
              </span>
            </div>

            <div className="info-item">
              <span className="label">Independente:</span>
              <span className="value">{country.independent ? "Sim" : "Não"}</span>
            </div>

            <div className="info-item">
              <span className="label">Idiomas:</span>
              <span className="value">
                {country.languages ? Object.values(country.languages).join(", ") : "Não disponível"}
              </span>
            </div>

            <div className="info-item">
              <span className="label">Moedas:</span>
              <span className="value">
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((currency) => `${currency.name} (${currency.symbol || ""})`)
                      .join(", ")
                  : "Não disponível"}
              </span>
            </div>
          </div>

          <div className="map-link">
            <a href={country.googleMaps} target="_blank" rel="noopener noreferrer" className="google-maps-button">
              Ver no Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetail
