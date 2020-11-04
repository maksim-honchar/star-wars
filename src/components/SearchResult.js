import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../redux/planetsSlice'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        minHeight: '90vh',
        margin: 'auto',
        marginTop: 35
    },
    no_residents: {
        border: '1px solid #ff9800',
        padding: 3,
        borderRadius: 5,
        width: 100,
        margin: '0 auto'
    },
    wrapper_residents: {
        backgroundColor: '#eceff1',
        borderRadius: 5,
        padding: 20,
        minHeight: 300
    }
})


export const SearchResult = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const [resi, setResi] = useState([])

    const planet = useSelector(state => state.planets.data.results[0])

    useEffect(() => {
        if (planet) {
            const arrForResi = []
            const { residents } = planet
            const requests = residents.map(resident => fetch(resident))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(resident => arrForResi.push(resident.name)))
                .then(() => setResi(arrForResi))
        } else {
            fetch(`https://swapi.dev/api/planets/?search=${planet}`)
                .then(response => response.json())
                .then(result => dispatch(updateData(result)))
        }
    }, [dispatch, planet])


    if (!planet) {
        return (
            <section>
                <h2>Planet not found!</h2>
            </section>
        )
    }

    const onGoback = () => history.push('/')

    return (
        <section>
            <div style={{ backgroundColor: '#e0e0e0' }}>
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
                        <div className={classes.wrapper_residents}>
                            <Typography variant="h6" gutterBottom>
                                Residents
                            </Typography>
                            {
                                planet.residents.length === 0 ?
                                    <Typography color="error" className={classes.no_residents}>No residents</Typography>
                                    :
                                    resi.length < 1 ?
                                        <CircularProgress />
                                        : resi.map(name => <Typography variant="subtitle1" className={classes.residents} key={name}>{name}</Typography>)
                            }
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button onClick={onGoback}>
                            Go Back
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </section >
    )
}