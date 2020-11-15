import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './speciesSlice'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#fafafa',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 250,
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#212121'
    },
    inputRoot: {
        color: '#212121',
        height: 43
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))


export const AutoSearchSpecies = () => {
    const classes = useStyles()
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
        <div className={classes.search}>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    size="small"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    {...defaultProps}
                    id="auto-people"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="auto-select" margin="none" />}
                />
            </form >
        </div>
    )
}



