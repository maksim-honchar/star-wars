import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        height: '100vh',
        marginTop: 25,
        margin: 'auto'
    },
    no_residents: {
        border: '1px solid #ff9800',
        padding: 3,
        marginLeft: 10,
        borderRadius: 5
    },
    residents: {
        textDecoration: 'underline',
        paddingTop: 0
    },
    wrapper_residents: {
        backgroundColor: '#eceff1',
        borderRadius: 5,
        padding: 10
    }
})



export const SinglePlanetPage = ({ match }) => {
    const { planetName } = match.params
    const classes = useStyles()
    const [resi, setResi] = useState([])



    const planet = useSelector(state =>
        state.planets.data.results.find(planet => planet.name === planetName)
    )

    // console.log(planet.residents)
    let x = []
    useEffect(() => {
        planet.residents.map(async (url) => {
            const response = await fetch(url)
            const result = await response.json()
            // console.log(result.name)
            x.push(result.name)
            console.log(x)
            setResi([resi, ...x])
        })
    }, [])



    if (!planet) {
        return (
            <section>
                <h2>Planet not found!</h2>
            </section>
        )
    }



    return (
        <section>
            <article>
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
                        <br />
                        <Typography variant="body1" component="p" className={classes.wrapper_residents}>
                            Residents:
                            {
                                resi.length !== 0
                                    ? resi.map(name => <p className={classes.residents}>{name}</p>)
                                    : <span className={classes.no_residents}>No residents</span>
                            }
                        </Typography>
                    </CardContent>
                </Card>
            </article>
        </section >
    )
}