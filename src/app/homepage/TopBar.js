import React from 'react'

import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    title: {
        margin: 'auto'
    },
    link: {
        color: '#ffc107',
        fontWeight: 'bold'
    },
    toolbar: {
        height: 75
    }
}))

export const TopBar = () => {
    const classes = useStyles()

    return (
        <section>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.title}>
                        <Typography variant="h4" noWrap>
                            <span className={classes.link}>Star Wars</span>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </section>
    )
}