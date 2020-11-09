import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { PlanetsCard } from './PlanetsCard'
import { FilmsCard } from './FilmsCard'

const useStyles = makeStyles({
    wraper4cards: {
        display: 'flex'
    }
})


export const HomePage = () => {
    const classes = useStyles()

    return (
        <section>
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Star Wars
                        </Typography>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
            <div className={classes.wraper4cards}>
                <FilmsCard />
                <PlanetsCard />
            </div>
        </section>
    )
}