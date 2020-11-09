import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './planetsSlice'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


export const AutoSearchPlanets = () => {
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
        history.push(`/planets/${value}`)
        setValue('')
    }


    useEffect(() => {
        let addPlanets = []
        if (amountPlanets) {
            for (let i = 1; i <= amountPlanets; i++) {
                fetch(`http://swapi.dev/api/planets/${i}`)
                    .then(response => response.json())
                    .then(planet => addPlanets.push(planet.name))
            }
            setAllPlanets(addPlanets)
        } else {
            const fetchCount = () => dispatch => {
                fetch('http://swapi.dev/api/planets/')
                    .then(response => response.json())
                    .then(result => dispatch(updateDataCount(result.count)))
            }
            dispatch(fetchCount())
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



