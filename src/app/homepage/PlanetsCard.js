import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'

import planets from '../pics/planets.jpg'

const useStyles = makeStyles({
    card: {
        width: 345,
        margin: 50
    },
    learnMore: {
        color: '#212121'
    },
    link: {
        textDecoration: 'none'
    }
})


export const PlanetsCard = () => {
    const classes = useStyles()

    return (
        <Link to="planets" className={classes.link}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="planet"
                        height="140"
                        image={planets}
                        title="Planets"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            PLANETS
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Planets in the Star Wars universe
                            </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button className={classes.learnMore} size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Link>
    )
}