import React, { useState, useEffect } from 'react'
import axios from 'axios'

//key from https://weatherstack.com/ for their api of weather
const api_key = process.env.REACT_APP_API_KEY

//component that renders the weather of a single country
const Weather = ({ weather }) => {
    if (weather.length) {
        return (
            <div>
                <h2>Weather in {weather[0].location.name}</h2>
                <b>temperature:</b> {weather[0].current.temperature} Celcius <br />
                <img src={weather[0].current.weather_icons} width="50" /> <br />
                <b>wind:</b> {weather[0].current.wind_speed} mph direction {weather[0].current.wind_dir}
            </div>
        )
    }
    else {
        return null
    }
}

//component that renders basic info of a single country
const Country = ({ country }) => (
    <div>
        <h1>{country.name}</h1>
        capital {country.capital} <br />
        population {country.population}
        <h2>languages</h2>
        {country.languages.map((language, i) => <div key={i}>{language.name}</div>)}
        <br />
        <img src={country.flag} width="100" />
    </div>
)

//component that determine which others components are rendered
//depending on the number of matchings
const MatchingCountries = ({ countries, setOutput, weather }) => {
    const numberOfMatches = countries.length
    if (numberOfMatches === 0) {
        return null
    }
    if (numberOfMatches === 1) {
        return (
            <div>
                <Country country={countries[0]} />
                <Weather weather={weather} />
            </div>
        )
    }
    if (numberOfMatches > 1 && numberOfMatches <= 10) {
        return <div>
            {countries.map(country =>
                <div key={country.name}>
                    {country.name}{" "}
                    <button onClick={() =>
                        setOutput(countries.filter(countr => countr.name === country.name))
                    }>show</button>
                </div>
            )}
        </div>
    }
    if (numberOfMatches > 10) {
        return <div> Too many matches, specify another filter </div>
    }
}


const App = () => {
    const [countries, setCountries] = useState([])
    const [input, setInput] = useState('')
    const [output, setOutput] = useState([])
    const [weather, setWeather] = useState([])

    //Function for fetching basic countries info
    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }
    useEffect(hook, [])

    //Function for fetching basic weather info of a country
    const fetchWeather = (countryName) => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`)
            .then(response => setWeather([response.data]))
    }

    //Function for processes the input "find countries"
    const Search = (event) => {
        setInput(event.target.value)
        const newOutput = event.target.value === "" ?
            [] :
            countries.filter(country =>
                country.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setOutput(newOutput)

        if (newOutput.length === 1)
            fetchWeather(newOutput[0].name)
    }


    return (
        <div>
            <div>
                find countries <input
                    value={input}
                    onChange={Search}
                />
            </div>
            <MatchingCountries
                countries={output}
                setOutput={setOutput}
                weather={weather}
            />
        </div>
    )
}

export default App