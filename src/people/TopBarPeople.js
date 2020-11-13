import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateData, updateCurrentPage } from './peopleSlice'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { AutoSearchPeople } from './AutoSearchPeople'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    link: {
        cursor: 'pointer'
    },
    wrapper4_title_search: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
    },
    toolbar: {
        // height: 80
    },
    title: {
        marginRight: 10
    },
    search_field: {
        margin: 10
    }
}))


export const TopBarPeople = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const toStartPage = () => {
        const asyncRequestData = () => async (dispatch) => {
            const response = await fetch('https://swapi.dev/api/people')
            if (response.ok) {
                const result = await response.json()
                dispatch(updateData(result))
            } else {
                console.log('HTTP error: ' + response.status)
            }
        }
        dispatch(asyncRequestData())
        dispatch(updateCurrentPage(0))
        history.push('/people')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.wrapper4_title_search}>
                        <div className={classes.title}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                <span className={classes.link} onClick={toStartPage}>Star Wars - people</span>
                            </Typography>
                        </div>
                        <div className={classes.search_field}>
                            <AutoSearchPeople />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
