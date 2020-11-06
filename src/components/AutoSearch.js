/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateSearchResult } from '../redux/planetsSlice'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


export const AutoSearch = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const amountPlanets = useSelector(selectCount)

    const [allPlanets, setAllPlanets] = useState([])
    const [value, setValue] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const asyncRequestData = () => async (dispatch) => {
            const response = await fetch(`https://swapi.dev/api/planets/?search=${value}`)
            if (response.ok) {
                const searchPlanet = await response.json()
                dispatch(updateSearchResult(searchPlanet.results))
            } else {
                console.log('HTTP error: ' + response.status)
            }
        }
        dispatch(asyncRequestData())
        history.push('/planets/search')
        setValue('')
    }

    useEffect(() => {
        let addPlanets = []
        let counter = 1
        if (amountPlanets) {
            while (counter <= amountPlanets) {
                fetch(`http://swapi.dev/api/planets/${counter}`)
                    .then(response => response.json())
                    .then(planet => addPlanets.push(planet.name))
                    .then(counter += 1)
            }
            setAllPlanets(addPlanets)
        }
    }, [amountPlanets, dispatch])


    const defaultProps = {
        options: allPlanets,
        getOptionLabel: (option) => option,
    }


    return (
        <form onSubmit={handleSubmit}>
            <Autocomplete
                size="small"
                style={{ width: 300, backgroundColor: 'white' }}
                {...defaultProps}
                id="controlled-demo"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="choose a planet" margin="none" />}
            />
        </form >
    )
}



