import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        minHeight: '40vh',
        margin: 'auto',
        marginTop: 35
    },
    go_back: {
        margin: 'auto'
    }
})

export const NotFound = () => {
    const classes = useStyles()
    const history = useHistory()

    const onGoback = () => history.push('/')

    return (
        <section>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Not found!
                </Typography>
                    <hr />
                </CardContent>
                <CardActions>
                    <div className={classes.go_back}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={onGoback}
                            color="inherit"
                        >
                            Go Back
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </section>
    )
}