import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDataResults } from './filmsSlice'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { mainUrl } from '../app/helper'

import { LeftMenu } from '../app/LeftMenu'
import { TopBarFilms } from './TopBarFilms'
import { NotFound } from '../app/NotFound'

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#e0e0e0',
        display: 'flex',
    },
    content: {
        margin: ' 35px auto'
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
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
    },
    topPart: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: 20
    },
    bottomPart: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: 20
    },
})


export const SingleFilmPage = ({ match }) => {
    const { filmTitle } = match.params
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const [filmCharacters, setFilmCharacter] = useState([])
    const [filmPlanets, setFilmPlanets] = useState([])
    const [filmStarships, setFilmStarships] = useState([])
    const [filmVehicles, setFilmVehicles] = useState([])
    const [filmSpecies, setFilmSpecies] = useState([])

    const film = useSelector(state => state.films.data.results.find(film => film.title === filmTitle))
    // console.log(film)

    useEffect(() => {
        if (film) {
            const arrForCharacters = []
            const { characters } = film
            const requests = characters.map(character => fetch(character))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(character => arrForCharacters.push(character.name)))
                .then(() => setFilmCharacter(arrForCharacters))
        }
        else {
            const results = () => dispatch => {
                fetch(`${mainUrl}/films/?search=${filmTitle}`)
                    .then(response => response.json())
                    .then(film => dispatch(updateDataResults(film.results)))
            }
            dispatch(results())
        }
    }, [dispatch, film, filmTitle])

    useEffect(() => {
        if (film) {
            const arrForPlanets = []
            const { planets } = film
            const requests = planets.map(planet => fetch(planet))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(planet => arrForPlanets.push(planet.name)))
                .then(() => setFilmPlanets(arrForPlanets))
        }
    }, [film])

    useEffect(() => {
        if (film) {
            const arrForStarships = []
            const { starships } = film
            const requests = starships.map(starship => fetch(starship))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(starship => arrForStarships.push(starship.name)))
                .then(() => setFilmStarships(arrForStarships))
        }

    }, [film])

    useEffect(() => {
        if (film) {
            const arrForVehicles = []
            const { vehicles } = film
            const requests = vehicles.map(vehicle => fetch(vehicle))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(vehicle => arrForVehicles.push(vehicle.name)))
                .then(() => setFilmVehicles(arrForVehicles))
        }
    }, [film])

    useEffect(() => {
        if (film) {
            const arrForSpecies = []
            const { species } = film
            const requests = species.map(form => fetch(form))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(form => arrForSpecies.push(form.name)))
                .then(() => setFilmSpecies(arrForSpecies))
        }
    }, [film])


    const onGoback = () => history.push('/films')

    if (!film) {
        return (
            <React.Fragment>
                <TopBarFilms />
                <NotFound />
            </React.Fragment>
        )
    }

    const showPage = (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {film.title}
                </Typography>
                <hr />
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Episode: {film.episode_id}
                </Typography>
                <br />
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    {film.opening_crawl}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Director: {film.director}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Producer: {film.producer}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Date: {film.release_date}
                </Typography>

                <br />
                <div className={classes.wrapper_bottomBlock}>
                    <div className={classes.topPart}>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Vehicles
                            </Typography>
                            {
                                film.vehicles.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>No vehicles</Typography>
                                    :
                                    filmVehicles.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Planets
                            </Typography>
                            {
                                film.planets.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>No films</Typography>
                                    :
                                    filmPlanets.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Starships
                            </Typography>
                            {
                                film.starships.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>No starships</Typography>
                                    :
                                    filmStarships.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>

                    </div>
                    <div className={classes.bottomPart}>

                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Species
                            </Typography>
                            {
                                film.species.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>No species</Typography>
                                    :
                                    filmSpecies.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Characters
                            </Typography>
                            {
                                film.characters.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>No characters</Typography>
                                    :
                                    filmCharacters.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>
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
            <TopBarFilms />
            <div className={classes.wrapper}>
                <div className={classes.LeftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        // (film.characters.length !== 0 && film.characters.length !== filmCharacters.length) ||
                        //     (film.planets.length !== 0 && film.planets.length !== filmPlanets.length) ||
                        //     (film.starships.length !== 0 && film.starships.length !== filmStarships.length) ||
                        //     (film.vehicles.length !== 0 && film.vehicles.length !== filmVehicles.length) ||
                        //     (film.species.length !== 0 && film.species.length !== filmSpecies.length)
                        //     ? <CircularProgress />
                        //     : 
                        showPage
                    }
                </div>
            </div>
        </section >
    )
}