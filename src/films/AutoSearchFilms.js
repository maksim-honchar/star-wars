import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './filmsSlice'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


export const AutoSearchFilms = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const amountPlanets = useSelector(selectCount)


    const [allFilms, setAllFilms] = useState([])
    const [value, setValue] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/films/${value}`)
        setValue('')
    }


    useEffect(() => {
        let addFilms = []
        if (amountPlanets) {
            for (let i = 1; i <= amountPlanets; i++) {
                fetch(`http://swapi.dev/api/films/${i}`)
                    .then(response => response.json())
                    .then(film => addFilms.push(film.title))
            }
            setAllFilms(addFilms)
        } else {
            const fetchCount = () => dispatch => {
                fetch('http://swapi.dev/api/films/')
                    .then(response => response.json())
                    .then(result => dispatch(updateDataCount(result.count)))
            }
            dispatch(fetchCount())
        }
    }, [amountPlanets, dispatch])


    const defaultProps = {
        options: allFilms,
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
                renderInput={(params) => <TextField {...params} label="choose a movie" margin="none" />}
            />
        </form >
    )
}



