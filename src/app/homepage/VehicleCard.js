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

import vehicle from '../pics/vehicle2.jpeg'

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


export const VehicleCard = () => {
    const classes = useStyles()

    return (
        <Link to="vehicle" className={classes.link}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="vehicle"
                        height="140"
                        image={vehicle}
                        title="Vehicle"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            VEHICLE
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Vehicle in the Star Wars universe
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button className={classes.learnMore} size="small" color="primary">
                        Go to section
                    </Button>
                </CardActions>
            </Card>
        </Link>
    )
}