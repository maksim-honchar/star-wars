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

import people from '../pics/people.jpg'

const useStyles = makeStyles({
    card: {
        width: 400,
        margin: 50
    },
    learnMore: {
        color: '#212121'
    },
    link: {
        textDecoration: 'none'
    }
})


export const PeopleCard = () => {
    const classes = useStyles()

    return (
        <Link to="people" className={classes.link}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="people"
                        height="140"
                        image={people}
                        title="People"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            PEOPLE
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            People in the Star Wars universe
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