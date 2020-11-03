import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../redux/planetsSlice'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        height: '90vh',
        marginTop: 20,
        margin: 'auto'
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
        padding: 20
    }
})



export const SinglePlanetPage = ({ match }) => {
    const { planetName } = match.params
    const dispatch = useDispatch()
    const classes = useStyles()
    const [resi, setResi] = useState([])

    const planet = useSelector(state =>
        state.planets.data.results.find(planet => planet.name === planetName)
    )

    // console.log(planet)

    let names = []
    useEffect(() => {
        if (planet) {
            planet.residents.forEach(async (url) => {
                const response = await fetch(url)
                const result = await response.json()
                // console.log(result.name)
                names.push(result.name)
                // console.log(names)
                setResi([resi, ...names])
            })
        }

    }, [planet])


    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/?search=${planetName}`)
            .then(response => response.json())
            .then(result => dispatch(updateData(result)))
        // .then(result => console.log(result))
    }, [dispatch, planetName])


    if (!planet) {
        return (
            <section>
                <h2>Planet not found!</h2>
            </section>
        )
    }


    return (
        <section>
            <div>
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
                </Card>
            </div>
        </section >
    )
}