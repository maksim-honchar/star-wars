import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateCurrentPage } from '../redux/planetsSlice'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 20,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: '#ffeb3b',
        textDecoration: 'none',
        cursor: 'pointer'
    }
}))


export const TopBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const onToHome = () => {
        dispatch(updateCurrentPage(0))
        history.push('/')
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {/* <Link to="/" className={classes.link}>Star Wars</Link> */}
                        <span className={classes.link} onClick={onToHome}>
                            Star Wars
                        </span>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}