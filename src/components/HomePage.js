import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { updateData, selectCount, selectPlanets, selectNext, selectPrevious } from '../redux/planetsSlice'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'

import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    card: {
        minWidth: 375,
        margin: 10
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
    },
    spinner: {
        margin: 300
    },
    table_pagination: {
        marginTop: 30
    }
})


export const HomePage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const count = useSelector(selectCount)
    const planets = useSelector(selectPlanets)
    const nextUrlPage = useSelector(selectNext)
    const prevUrlPage = useSelector(selectPrevious)


    const [page, setPage] = useState(0)
    const [url, setUrl] = useState('https://swapi.dev/api/planets/')


    const handleChangePage = (event, newPage) => {
        if (page < newPage) {
            setPage(newPage)
            setUrl(nextUrlPage)
        } else {
            setPage(newPage)
            setUrl(prevUrlPage)
        }

    }

    const asyncRequestData = () => async (dispatch) => {
        const response = await fetch(url)
        if (response.ok) {
            const result = await response.json()
            // console.log(result)
            dispatch(updateData(result))
        } else {
            console.log('HTTP error: ' + response.status)
        }
    }

    let listsPlanet

    if (planets) {
        listsPlanet = planets.map(planet => (
            <Link to={`/planets/${planet.name}`} className={classes.link} key={planet.name}>
                <Card className={classes.card} variant="outlined" >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {planet.name}
                        </Typography>
                        <hr />
                        <br />
                        <Typography component="p" >
                            Climate: <span className={classes.headlines}>{planet.climate}</span>
                        </Typography>
                        <br />
                        <Typography component="p" >
                            Population:  <span className={classes.headlines}>{planet.population}</span>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Link>
        ))
    }


    useEffect(() => {
        dispatch(asyncRequestData())
    }, [page])

    console.log(listsPlanet.length)

    return (
        <section>
            {
                listsPlanet.length < 4 ?
                    <div className={classes.spinner}>
                        <CircularProgress />
                    </div>
                    :
                    <React.Fragment>
                        <div className={classes.lists_planet}>
                            {listsPlanet}
                        </div>
                        <div className={classes.table_pagination}>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={count}
                                rowsPerPage={10}
                                page={page}
                                onChangePage={handleChangePage}
                            />
                        </div>
                    </React.Fragment>
            }
        </section>
    )
}