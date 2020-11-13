import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './speciesSlice'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


export const AutoSearchSpecies = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const amountSpecies = useSelector(selectCount)


    const [allSpecies, setAllSpecies] = useState([])
    const [value, setValue] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/species/${value}`)
        setValue('')
    }


    useEffect(() => {
        let addSpecies = []
        if (amountSpecies) {
            for (let i = 1; i <= amountSpecies; i++) {
                fetch(`http://swapi.dev/api/species/${i}`)
                    .then(response => response.json())
                    .then(kind => addSpecies.push(kind.name))
            }
            setAllSpecies(addSpecies)
        } else {
            const fetchCount = () => dispatch => {
                fetch('http://swapi.dev/api/species/')
                    .then(response => response.json())
                    .then(result => dispatch(updateDataCount(result.count)))
            }
            dispatch(fetchCount())
        }
    }, [amountSpecies, dispatch])


    const defaultProps = {
        options: allSpecies,
        getOptionLabel: (option) => option,
    }

    // console.log(allPeople)
    return (
        <form onSubmit={handleSubmit}>
            <Autocomplete
                size="small"
                style={{ width: 250, backgroundColor: 'white' }}
                {...defaultProps}
                id="controlled-demo"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="choose a person" margin="none" />}
            />
        </form >
    )
}



