import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './planetsSlice'
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


export const AutoSearchPlanets = () => {
    const classes = useStyles()
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
        <div className={classes.search}>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    size="small"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    {...defaultProps}
                    id="auto-planets"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="auto-select" margin="none" />}
                />
            </form >
        </div>
    )
}



