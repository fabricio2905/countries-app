import { useState, useEffect } from "react"
import "./App.css"
import CountryList from "./components/CountryList"
import CountryDetail from "./components/CountryDetail"
import FilterBar from "./components/FilterBar"

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = process.env.NODE_ENV === "production" ? "/paises" : "http://localhost:5000/paises"

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error("Falha ao buscar países")
        }
        const data = await response.json()
        const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
        setCountries(sortedData)
        setFilteredCountries(sortedData)

        const uniqueRegions = [...new Set(sortedData.map((c) => c.region))]
        console.log("Regiões únicas no frontend:", uniqueRegions)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [API_URL])

  const handleCountrySelect = async (countryName) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/${countryName}`)
      if (!response.ok) {
        throw new Error("Falha ao buscar detalhes do país")
      }
      const data = await response.json()
      setSelectedCountry(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (region) => {
    console.log("Filtrando por região:", region)

    if (region === "all") {
      setFilteredCountries([...countries].sort((a, b) => a.name.localeCompare(b.name, "pt-BR")))
    } else {
      const filtered = countries
        .filter((country) => {
          console.log(`Comparando: país região "${country.region}" com filtro "${region}"`)
          return country.region === region
        })
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))

      console.log(`Encontrados ${filtered.length} países na região ${region}`)
      setFilteredCountries(filtered)
    }
    setSelectedCountry(null)
  }

  const handleBackToList = () => {
    setSelectedCountry(null)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Países do Mundo</h1>
      </header>

      {selectedCountry ? (
        <CountryDetail country={selectedCountry} onBack={handleBackToList} />
      ) : (
        <>
          <FilterBar onFilterChange={handleFilterChange} />
          {loading ? (
            <div className="loading">Carregando países...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <CountryList countries={filteredCountries} onCountrySelect={handleCountrySelect} />
          )}
        </>
      )}
    </div>
  )
}

export default App
