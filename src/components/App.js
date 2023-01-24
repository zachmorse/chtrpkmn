import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from 'axios'
import '../styles/home.css'

import { TYPES, WEAKNESSES } from '../utils/globalconstants'

import PokemonList from './PokemonList'
import Loading from './Loading'
import Form from './Form'

const App = () => {
    const [masterData, setMasterData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [displayData, setDisplayData] = useState([])
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedWeaknesses, setSelectedWeaknesses] = useState([])

    useEffect(() => {
        axios
            .get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            .then(response => {
                setMasterData(response.data.pokemon)
                setDisplayData(response.data.pokemon)
                setLoaded(true)
            })
            .catch(err => {
                console.log('ERROR:', err)
            })
    }, [])

    const updateResults = e => {
        e.preventDefault()

        const searched = searchTerm
            ? masterData.filter(element => element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            : masterData
        const typeFiltered =
            selectedTypes.length > 0
                ? searched.filter(element => _.difference(selectedTypes, element.type).length === 0)
                : searched
        const weaknessFiltered =
            selectedWeaknesses.length > 0
                ? typeFiltered.filter(element => _.difference(selectedWeaknesses, element.weaknesses).length === 0)
                : typeFiltered

        setDisplayData(weaknessFiltered)
    }

    const handleWeaknessChange = e => {
        setSelectedWeaknesses(e)
    }

    const handleTypeChange = e => {
        setSelectedTypes(e)
    }

    return (
        <div>
            {!isLoaded ? (
                <Loading />
            ) : (
                <div>
                    <h1 className='headerTitle'>Gotta Catch 'Em All!</h1>
                    <Form
                        updateResults={updateResults}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        types={TYPES}
                        weaknesses={WEAKNESSES}
                        handleTypeChange={handleTypeChange}
                        handleWeaknessChange={handleWeaknessChange}
                        selectedWeaknesses={selectedWeaknesses}
                        selectedTypes={selectedTypes}
                    />
                    <PokemonList stuff={displayData} />
                </div>
            )}
        </div>
    )
}

export default App
