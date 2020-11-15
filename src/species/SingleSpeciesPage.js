import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDataResults } from './speciesSlice'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { LeftMenu } from '../app/LeftMenu'
import { TopBarSpecies } from './TopBarSpecies'
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


export const SingleSpeciesPage = ({ match }) => {
    const { kindName } = match.params
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const [speciesHomeworld, setSpeciesHomeworld] = useState('')
    const [speciesFilms, setSpeciesFilms] = useState([])
    const [speciesPeople, setSpeciesPeople] = useState([])


    const kind = useSelector(state => state.species.data.results.find(kind => kind.name === kindName))
    // console.log(kind)

    useEffect(() => {
        if (kind) {
            const { homeworld } = kind
            fetch(homeworld)
                .then(response => response.json())
                .then(result => setSpeciesHomeworld(result.name))
        } else {
            const results = () => dispatch => {
                fetch(`https://swapi.dev/api/species/?search=${kindName}`)
                    .then(response => response.json())
                    .then(person => dispatch(updateDataResults(person.results)))
            }
            dispatch(results())
        }
    }, [dispatch, kind, kindName])

    useEffect(() => {
        if (kind) {
            const arrForMovies = []
            const { films } = kind
            const requests = films.map(film => fetch(film))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(film => arrForMovies.push(film.title)))
                .then(() => setSpeciesFilms(arrForMovies))
        }
    }, [kind])

    useEffect(() => {
        if (kind) {
            const arrForPeople = []
            const { people } = kind
            const requests = people.map(person => fetch(person))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(person => arrForPeople.push(person.name)))
                .then(() => setSpeciesPeople(arrForPeople))
        }
    }, [kind])

    const onGoback = () => history.push('/species')

    if (!kind) {
        return (
            <React.Fragment>
                <TopBarSpecies />
                <NotFound />
            </React.Fragment>
        )
    }

    const showPage = (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {kind.name}
                </Typography>
                <hr />
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Classification: {kind.classification}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Designation: {kind.designation}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Average height: {kind.average_height}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Сolor of the skin: {kind.skin_colors}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Hair color: {kind.hair_colors}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Eye color: {kind.eye_colors}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Average lifespan: {kind.average_lifespan}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Homeworld: {speciesHomeworld}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Language: {kind.language}
                </Typography>


                <br />
                <div className={classes.wrapper_bottomBlock}>
                    <div className={classes.topPart}>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                Movies
                            </Typography>
                            {
                                kind.films.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>Information not found</Typography>
                                    :
                                    speciesFilms.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                            }
                        </div>
                        <div className={classes.list}>
                            <Typography variant="h6" gutterBottom>
                                People
                            </Typography>
                            {
                                kind.people.length === 0 ?
                                    <Typography color="error" className={classes.no_values}>Information not found</Typography>
                                    :
                                    speciesPeople.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
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
            <TopBarSpecies />
            <div className={classes.wrapper}>
                <div className={classes.LeftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        // (kind.films.length !== 0 && kind.films.length !== speciesFilms.length) ||
                        //     (kind.people.length !== 0 && kind.people.length !== speciesPeople.length)
                        //     ? <CircularProgress />
                        //     : 
                        showPage
                    }
                </div>
            </div>
        </section >
    )
}