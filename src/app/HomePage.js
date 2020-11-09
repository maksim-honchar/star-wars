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
import planets from './pics/planets.jpg'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: 20
    },
    lists_planet: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 25
    },
    link: {
        textDecoration: 'none'
    },
    headlines: {
        color: '#757575',
        fontWeight: 'bold'
    }
})


export const HomePage = () => {
    const classes = useStyles()

    return (
        <section>
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
                                Planets
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Planets in the universe Star Wars
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Link>
        </section>
    )
}