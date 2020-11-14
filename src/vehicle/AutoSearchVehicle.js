import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './vehicleSlice'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


export const AutoSearchVehicle = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const amountVehicle = useSelector(selectCount)


    const [allVehicle, setAllVehicle] = useState([])
    const [value, setValue] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/vehicles/${value}`)
        setValue('')
    }


    useEffect(() => {
        let addVehicle = []
        if (amountVehicle) {
            for (let i = 1; i <= amountVehicle; i++) {
                fetch(`http://swapi.dev/api/vehicles/${i}`)
                    .then(response => response.json())
                    .then(vehicle => addVehicle.push(vehicle.name))
            }
            setAllVehicle(addVehicle)
        } else {
            const fetchCount = () => dispatch => {
                fetch('http://swapi.dev/api/vehicles/')
                    .then(response => response.json())
                    .then(result => dispatch(updateDataCount(result.count)))
            }
            dispatch(fetchCount())
        }
    }, [amountVehicle, dispatch])


    const defaultProps = {
        options: allVehicle,
        getOptionLabel: (option) => option,
    }

    return (
        <form onSubmit={handleSubmit}>
            <Autocomplete
                size="small"
                style={{ width: 250, backgroundColor: 'white' }}
                {...defaultProps}
                id="controlled-demo"
                freeSolo
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="choose a transport" margin="none" />}
            />
        </form >
    )
}



