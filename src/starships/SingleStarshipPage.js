import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDataResults } from './starshipsSlice'
import { useHistory } from 'react-router-dom'
import { mainUrl } from '../app/helper'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core'

import { TopBarStarships } from './TopBarStarships'
import { LeftMenu } from '../app/LeftMenu'
import { NotFound } from '../app/NotFound'

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#e0e0e0',
        display: 'flex'
    },
    content: {
        margin: '35px auto'
    },
    card: {
        width: 700,
        minHeight: '90vh',
    },
    no_values: {
        border: '1px solid #ff9800',
        padding: 3,
        borderRadius: 5,
        width: 100,
        margin: '0 auto'
    },
    wrapper_bottomBlock: {
        backgroundColor: '#eceff1',
        borderRadius: 5,
        padding: 20,
        minHeight: 300,
        display: 'flex',
        justifyContent: 'space-around'
    },
    spinner: {
        margin: 300
    },

})


export const SingleStarshipPage = ({ match }) => {
    const { starshipName } = match.params
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const [pilots, setPilots] = useState([])
    const [films, setFilms] = useState([])

    const starship = useSelector(state => state.starships.data.results.find(starship => starship.name === starshipName))

    useEffect(() => {
        if (starship) {
            const arrForPilots = []
            const { pilots } = starship
            const requests = pilots.map(pilot => fetch(pilot))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(pilot => arrForPilots.push(pilot.name)))
                .then(() => setPilots(arrForPilots))
        } else {
            const results = () => dispatch => {
                fetch(`${mainUrl}/starships/?search=${starshipName}`)
                    .then(response => response.json())
                    .then(starship => dispatch(updateDataResults(starship.results)))
            }
            dispatch(results())
        }
    }, [dispatch, starship, starshipName])

    useEffect(() => {
        if (starship) {
            const arrForFilms = []
            const { films } = starship
            const requests = films.map(film => fetch(film))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(film => arrForFilms.push(film.title)))
                .then(() => setFilms(arrForFilms))
        }
    }, [dispatch, starship, starshipName])

    const onGoback = () => history.push('/starships')

    if (!starship) {
        return (
            <NotFound />
        )
    }

    const showPage = (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {starship.name}
                </Typography>
                <hr />
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    MGLT: {starship.MGLT}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Cargo capacity: {starship.cargo_capacity}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Consumables: {starship.consumables}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Cost: {starship.cost_in_credits}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Created: {starship.created}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Crew: {starship.crew}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Edited: {starship.edited}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Hyperdrive rating: {starship.hyperdrive_rating}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Length: {starship.length}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Manufacturer: {starship.manufacturer}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Speed: {starship.max_atmosphering_speed}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Model: {starship.model}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Passengers: {starship.passengers}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Class: {starship.starship_class}
                </Typography>
                <br />
                <div className={classes.wrapper_bottomBlock}>
                    <div className={classes.list}>
                        <Typography variant="h6" gutterBottom>
                            Pilots
                         </Typography>
                        {
                            starship.pilots.length === 0 ?
                                <Typography color="error" className={classes.no_values}>No residents</Typography>
                                :
                                pilots.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                        }
                    </div>
                    <div className={classes.list}>
                        <Typography variant="h6" gutterBottom>
                            Films
                    </Typography>
                        {
                            starship.films.length === 0 ?
                                <Typography color="error" className={classes.no_values}>No films</Typography>
                                :
                                films.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                        }
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <Button onClick={onGoback}>
                    Go Back
            </Button>
            </CardActions>
        </Card>
    )

    return (
        <section>
            <TopBarStarships />
            <div className={classes.wrapper}>
                <div className={classes.leftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        (starship.pilots.length !== 0 && starship.pilots.length !== pilots.length) ||
                            (starship.films.length !== 0 && starship.films.length !== films.length)
                            ? <CircularProgress />
                            : showPage
                    }
                </div>
            </div>
        </section>
    )
}