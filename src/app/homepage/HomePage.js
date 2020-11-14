import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { PeopleCard } from './PeopleCard'
import { PlanetsCard } from './PlanetsCard'
import { MoviesCard } from './MoviesCard'
import { SpeciesCard } from './SpeciesCard'
import { VehicleCard } from './VehicleCard'

const useStyles = makeStyles({
    wraper4cards: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
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
                <PeopleCard />
                <PlanetsCard />
                <MoviesCard />
                <SpeciesCard />
                <VehicleCard />
            </div>
        </section>
    )
}