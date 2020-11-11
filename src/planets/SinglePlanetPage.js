import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDataResults } from './planetsSlice'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { TopBarPlanets } from './TopBarPlanets'
import { LeftMenu } from '../app/LeftMenu'
import { NotFound } from '../app/NotFound'

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#e0e0e0',
        display: 'flex'
    },
    content: {
        margin: '35px 350px'
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
    }
})


export const SinglePlanetPage = ({ match }) => {
    const { planetName } = match.params
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const [resi, setResi] = useState([])
    const [films, setFilms] = useState([])

    const planet = useSelector(state => state.planets.data.results.find(planet => planet.name === planetName))

    useEffect(() => {
        if (planet) {
            const arrForResi = []
            const { residents } = planet
            const requests = residents.map(resident => fetch(resident))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(resident => arrForResi.push(resident.name)))
                .then(() => setResi(arrForResi))
        }
        else {
            const results = () => dispatch => {
                fetch(`https://swapi.dev/api/planets/?search=${planetName}`)
                    .then(response => response.json())
                    .then(planet => dispatch(updateDataResults(planet.results)))
            }
            dispatch(results())
        }
    }, [dispatch, planet, planetName])

    useEffect(() => {
        if (planet) {
            const arrForFilms = []
            const { films } = planet
            const requests = films.map(film => fetch(film))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(film => arrForFilms.push(film.title)))
                .then(() => setFilms(arrForFilms))
        }
        else {
            const results = () => dispatch => {
                fetch(`https://swapi.dev/api/planets/?search=${planetName}`)
                    .then(response => response.json())
                    .then(planet => dispatch(updateDataResults(planet.results)))
            }
            dispatch(results())
        }
    }, [dispatch, planet, planetName])

    const onGoback = () => history.push('/planets')

    if (!planet) {
        return (
            <NotFound />
        )
    }

    const showPage = (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {planet.name}
                </Typography>
                <hr />
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Rotation Period: {planet.rotation_period}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Diameter: {planet.diameter}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Climate: {planet.climate}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Gravity: {planet.gravity}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Terrain: {planet.terrain}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Population: {planet.population}
                </Typography>
                <br />
                <div className={classes.wrapper_bottomBlock}>
                    <div className={classes.residents}>
                        <Typography variant="h6" gutterBottom>
                            Residents
                         </Typography>
                        {
                            planet.residents.length === 0 ?
                                <Typography color="error" className={classes.no_values}>No residents</Typography>
                                :
                                resi.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                        }
                    </div>
                    <div className={classes.films}>
                        <Typography variant="h6" gutterBottom>
                            Films
                    </Typography>
                        {
                            planet.films.length === 0 ?
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
            <TopBarPlanets />
            <div className={classes.wrapper}>
                <div className={classes.leftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        showPage
                    }
                </div>
            </div>
        </section>
    )
}