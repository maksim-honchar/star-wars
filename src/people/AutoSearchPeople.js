import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount, updateDataCount } from './peopleSlice'
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



export const AutoSearchPeople = () => {
    const classes = useStyles()
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



