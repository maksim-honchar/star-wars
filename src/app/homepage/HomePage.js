import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { TopBar } from './TopBar'
import { PeopleCard } from './PeopleCard'
import { PlanetsCard } from './PlanetsCard'
import { MoviesCard } from './MoviesCard'
import { SpeciesCard } from './SpeciesCard'
import { VehicleCard } from './VehicleCard'
import { StarshipsCard } from './StarshipsCard'

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
                <TopBar />
            </React.Fragment>
            <div className={classes.wraper4cards}>
                <PeopleCard />
                <PlanetsCard />
                <MoviesCard />
                <SpeciesCard />
                <VehicleCard />
                <StarshipsCard />
            </div>
        </section>
    )
}