import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDataResults } from './peopleSlice'
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
import { TopBarPeople } from './TopBarPeople'
import { NotFound } from '../app/NotFound'

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#e0e0e0',
        display: 'flex',
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


export const SinglePersonPage = ({ match }) => {
    const { personName } = match.params
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const [personHomeWorld, setPersonHomeWorld] = useState('')
    const [personFilms, setPersonFilms] = useState([])
    const [personSpecies, setPersonSpecies] = useState('')
    const [personVehicles, setPersonVehicles] = useState([])
    const [personStarships, setPersonStarships] = useState([])



    const person = useSelector(state => state.people.data.results.find(person => person.name === personName))
    // console.log(person)

    useEffect(() => {
        if (person) {
            const { homeworld } = person
            fetch(homeworld)
                .then(response => response.json())
                .then(result => setPersonHomeWorld(result.name))
        }
    }, [dispatch, person, personName])

    useEffect(() => {
        if (person) {
            const arrForMovies = []
            const { films } = person
            const requests = films.map(film => fetch(film))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(film => arrForMovies.push(film.title)))
                .then(() => setPersonFilms(arrForMovies))
        } else {
            const results = () => dispatch => {
                fetch(`${mainUrl}/people/?search=${personName}`)
                    .then(response => response.json())
                    .then(person => dispatch(updateDataResults(person.results)))
            }
            dispatch(results())
        }
    }, [dispatch, person, personName])

    useEffect(() => {
        if (person) {
            const { species } = person
            fetch(species)
                .then(response => response.json())
                .then(result => setPersonSpecies(result.name))
        }
    }, [dispatch, person, personName])

    useEffect(() => {
        if (person) {
            const arrForVehicles = []
            const { vehicles } = person
            const requests = vehicles.map(vehicle => fetch(vehicle))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(vehicle => arrForVehicles.push(vehicle.name)))
                .then(() => setPersonVehicles(arrForVehicles))
        }
    }, [dispatch, person, personName])

    useEffect(() => {
        if (person) {
            const arrForStarships = []
            const { starships } = person
            const requests = starships.map(starship => fetch(starship))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(starship => arrForStarships.push(starship.name)))
                .then(() => setPersonStarships(arrForStarships))
        }
    }, [dispatch, person, personName])

    const onGoback = () => history.push('/people')

    if (!person) {
        return (
            <React.Fragment>
                <TopBarPeople />
                <NotFound />
            </React.Fragment>
        )
    }

    const showPage = (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {person.name}
                </Typography>
                <hr />
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Height: {person.height}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Weight: {person.mass}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Hair color: {person.hair_color}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Сolor of the skin: {person.skin_color}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Eye color: {person.eye_color}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Year of birth: {person.birth_year}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Gender: {person.gender}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Homeworld: {personHomeWorld}
                </Typography>

                <br />
                <div className={classes.wrapper_bottomBlock}>
                    <div className={classes.topPart}>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Movies
                            </Typography>
                            {
                                person.films.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>Information not found</Typography>
                                    :
                                    personFilms.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Species
                            </Typography>
                            {
                                person.species.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>Information not found</Typography>
                                    :
                                    <Typography variant="subtitle1">{personSpecies}</Typography>
                            }
                        </div>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Vehicles
                            </Typography>
                            {
                                person.vehicles.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>Information not found</Typography>
                                    :
                                    personVehicles.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>
                    </div>
                    <div className={classes.bottomPart}>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Starships
                            </Typography>
                            {
                                person.starships.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>Information not found</Typography>
                                    :
                                    personStarships.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
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
            <TopBarPeople />
            <div className={classes.wrapper}>
                <div className={classes.LeftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        (personFilms.length !== person.films.length) ||
                            (person.vehicles.length !== 0 && personVehicles.length !== person.vehicles.length) ||
                            (person.starships.length !== 0 && personStarships.length !== person.starships.length)
                            ? <CircularProgress />
                            : showPage
                    }
                </div>
            </div>
        </section >
    )
}