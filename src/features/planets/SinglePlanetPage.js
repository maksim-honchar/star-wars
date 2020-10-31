import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        height: '80vh',
        marginTop: 25,
        margin: 'auto'
    }
})



export const SinglePlanetPage = ({ match }) => {
    const { planetName } = match.params
    const classes = useStyles()



    const planet = useSelector(state =>
        state.planets.data.results.find(planet => planet.name === planetName)
    )




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
                        <Typography gutterBottom>
                            {planet.name}
                        </Typography>
                        <hr />
                        <br />
                        <Typography color="textSecondary" component="p">
                            Rotation Period: {planet.rotation_period}
                        </Typography>
                        <br />
                        <Typography color="textSecondary" component="p">
                            Diameter: {planet.diameter}
                        </Typography>
                        <br />
                        <Typography color="textSecondary" component="p">
                            Climate: {planet.climate}
                        </Typography>
                        <br />
                        <Typography color="textSecondary" component="p">
                            Gravity: {planet.gravity}
                        </Typography>
                        <br />
                        <Typography color="textSecondary" component="p">
                            Terrain: {planet.terrain}
                        </Typography>
                        <br />
                        <Typography color="textSecondary" component="p">
                            Population: {planet.population}
                        </Typography>
                        <br />
                        <Typography color="textSecondary" component="p">
                            Residents: <ul></ul>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </article>
        </section>
    )
}