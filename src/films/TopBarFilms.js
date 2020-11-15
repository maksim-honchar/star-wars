import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateData, updateCurrentPage } from '../planets/planetsSlice'
import { mainUrl } from '../app/helper'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { AutoSearchFilms } from './AutoSearchFilms'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    link: {
        cursor: 'pointer',
        color: '#ffc107',
        fontWeight: 'bold'
    },
    wrapper4_title_search: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
    },
    title: {
        marginRight: 10
    },
    search_field: {
        margin: 10
    },
    toolbar: {
        height: 75
    }
}))


export const TopBarFilms = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const toStartPage = () => {
        const asyncRequestData = () => async (dispatch) => {
            const response = await fetch(`${mainUrl}/planets`)
            if (response.ok) {
                const result = await response.json()
                dispatch(updateData(result))
            } else {
                console.log('HTTP error: ' + response.status)
            }
        }
        dispatch(asyncRequestData())
        dispatch(updateCurrentPage(0))
        history.push('/films')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.wrapper4_title_search}>
                        <div className={classes.title}>
                            <Typography className={classes.title} variant="h5" noWrap>
                                <span className={classes.link} onClick={toStartPage}>Star Wars [ films ]</span>
                            </Typography>
                        </div>
                        <div className={classes.search_field}>
                            <AutoSearchFilms />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
