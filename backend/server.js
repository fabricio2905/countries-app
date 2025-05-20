const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// buscar dados da API REST Countries
const countryService = {
  async getAllCountries() {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all")
      const formattedCountries = response.data
        .map((country) => this.formatCountryData(country))
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))

      return formattedCountries
    } catch (error) {
      console.error("Erro ao buscar países:", error)
      throw new Error("Falha ao buscar dados de países")
    }
  },

  async getCountryByName(name) {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      if (response.data && response.data.length > 0) {
        return this.formatCountryData(response.data[0], true)
      }
      throw new Error("País não encontrado")
    } catch (error) {
      console.error(`Erro ao buscar país ${name}:`, error)
      throw new Error(`Falha ao buscar dados do país ${name}`)
    }
  },

  formatCountryData(country, detailed = false) {
    const formattedCountry = {
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
    }

    formattedCountry.region = this.translateRegion(formattedCountry.region)

    if (detailed) {
      let nativeName = null
      if (country.name.nativeName) {
        const firstLangKey = Object.keys(country.name.nativeName)[0]
        nativeName = country.name.nativeName[firstLangKey]?.common
      }

      return {
        ...formattedCountry,
        nativeName,
        capital: country.capital ? country.capital[0] : null,
        population: country.population,
        currencies: country.currencies,
        languages: country.languages,
        independent: country.independent,
        area: country.area,
        googleMaps: country.maps.googleMaps,
      }
    }

    return formattedCountry
  },

  translateRegion(region) {
    const translations = {
      Africa: "África",
      Americas: "Américas",
      Asia: "Ásia",
      Europe: "Europa",
      Oceania: "Oceania",
      Antarctic: "Antártida",
      Polar: "Polar",
    }

    return translations[region] || region
  },
}

app.get("/paises", async (req, res) => {
  try {
    const countries = await countryService.getAllCountries()
    res.json(countries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/paises/:nome", async (req, res) => {
  try {
    const country = await countryService.getCountryByName(req.params.nome)
    res.json(country)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

// servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
