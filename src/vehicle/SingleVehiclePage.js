import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateDataResults } from './vehicleSlice'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { TopBarVehicle } from './TopBarVehicle'
import { LeftMenu } from '../app/LeftMenu'
import { NotFound } from '../app/NotFound'
import { CircularProgress } from '@material-ui/core'

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


export const SingleVehiclePage = ({ match }) => {
    const { transportName } = match.params
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()
    const [pilots, setPilots] = useState([])
    const [films, setFilms] = useState([])

    const vehicle = useSelector(state => state.vehicle.data.results.find(transport => transport.name === transportName))

    useEffect(() => {
        if (vehicle) {
            const arrForPilots = []
            const { pilots } = vehicle
            const requests = pilots.map(resident => fetch(resident))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(pilot => arrForPilots.push(pilot.name)))
                .then(() => setPilots(arrForPilots))
        }
    }, [])

    useEffect(() => {
        if (vehicle) {
            const arrForFilms = []
            const { films } = vehicle
            const requests = films.map(film => fetch(film))
            Promise.all(requests)
                .then(response => Promise.all(response.map(element => element.json())))
                .then(result => result.forEach(film => arrForFilms.push(film.title)))
                .then(() => setFilms(arrForFilms))
        }
        else {
            const results = () => dispatch => {
                fetch(`https://swapi.dev/api/vehicles/?search=${transportName}`)
                    .then(response => response.json())
                    .then(planet => dispatch(updateDataResults(planet.results)))
            }
            dispatch(results())
        }
    }, [dispatch, transportName, vehicle])

    const onGoback = () => history.push('/vehicles')

    if (!vehicle) {
        return (
            <NotFound />
        )
    }

    const showPage = (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {vehicle.name}
                </Typography>
                <hr />
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Model: {vehicle.model}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Manufacturer: {vehicle.manufacturer}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Cost: {vehicle.cost_in_credits}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Length: {vehicle.length}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Speed: {vehicle.max_atmosphering_speed}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Crew: {vehicle.crew}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Passengers: {vehicle.passengers}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Cargo capacity: {vehicle.cargo_capacity}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Consumables: {vehicle.consumables}
                </Typography>
                <br />
                <Typography variant="h6" color="textSecondary" component="p">
                    Class: {vehicle.vehicle_class}
                </Typography>
                <br />
                <div className={classes.wrapper_bottomBlock}>
                    <div className={classes.list}>
                        <Typography variant="h6" gutterBottom>
                            Pilots
                         </Typography>
                        {
                            vehicle.pilots.length === 0 ?
                                <Typography color="error" className={classes.no_values}>Information not found</Typography>
                                :
                                pilots.map(name => <Typography variant="subtitle1" key={name}>{name}</Typography>)
                        }
                    </div>
                    <div className={classes.list}>
                        <Typography variant="h6" gutterBottom>
                            Films
                        </Typography>
                        {
                            vehicle.films.length === 0 ?
                                <Typography color="error" className={classes.no_values}>Information not found</Typography>
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
            <TopBarVehicle />
            <div className={classes.wrapper}>
                <div className={classes.leftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        // (vehicle.pilots.length !== 0 && vehicle.pilots.length !== pilots.length) ||
                        //     (vehicle.films.length !== 0 && vehicle.films.length !== films.length)
                        //     ? <CircularProgress />
                        //     : 
                        showPage
                    }
                </div>
            </div>
        </section>
    )
}