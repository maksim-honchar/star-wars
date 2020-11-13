import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './peopleSlice'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


export const AutoSearchPeople = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const amountPeople = useSelector(selectCount)


    const [allPeople, setAllPeople] = useState([])
    const [value, setValue] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/people/${value}`)
        setValue('')
    }


    useEffect(() => {
        let addPeople = []
        if (amountPeople) {
            for (let i = 1; i <= amountPeople; i++) {
                fetch(`http://swapi.dev/api/people/${i === 17 ? i + 1 : i}`)
                    .then(response => response.json())
                    .then(person => addPeople.push(person.name))
            }
            setAllPeople(addPeople)
        } else {
            const fetchCount = () => dispatch => {
                fetch('http://swapi.dev/api/people/')
                    .then(response => response.json())
                    .then(result => dispatch(updateDataCount(result.count)))
            }
            dispatch(fetchCount())
        }
    }, [amountPeople, dispatch])


    const defaultProps = {
        options: allPeople,
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



