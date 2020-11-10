import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { selectCount, selectFilms, selectNext, selectPrevious, selectCurrentPage, updateData, updateCurrentPage } from './filmsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { TopBarFilms } from './TopBarFilms'

// import anewhope from './pics/anewhope.jpeg'  

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'



const useStyles = makeStyles({
    card: {
        minWidth: 375,
        height: 375,
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
    },
    opening_crawl: {
        width: 350
    }
})


export const FilmsPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const count = useSelector(selectCount)
    const films = useSelector(selectFilms)
    const nextUrlPage = useSelector(selectNext)
    const prevUrlPage = useSelector(selectPrevious)
    const currentPage = useSelector(selectCurrentPage)

    const [url, setUrl] = useState(`https://swapi.dev/api/films/?page=${currentPage + 1}`)

    const handleChangePage = (event, newPage) => {
        if (currentPage < newPage) {
            dispatch(updateCurrentPage(newPage))
            setUrl(nextUrlPage)
        } else {
            dispatch(updateCurrentPage(newPage))
            setUrl(prevUrlPage)
        }
    }

    let listFilms

    if (films) {
        listFilms = films.map(film => (
            <Link to={`/films/${film.title}`} className={classes.link} key={film.title}>
                <Card className={classes.card} variant="outlined" >
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {film.title}
                        </Typography>
                        <br />
                        <Typography component="p" >
                            Episode: <span className={classes.headlines}>{film.episode_id}</span>
                        </Typography>
                        <br />
                        <Typography component="p" >
                            Year: <span className={classes.headlines}>{film.release_date.substring(0, 4)}</span>
                        </Typography>
                        <br />
                        <div className={classes.opening_crawl}>
                            <Typography component="p" >
                                {`${film.opening_crawl.substring(0, 196)} ...`}
                            </Typography>
                        </div>
                    </CardContent>
                    <br />
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
        const asyncRequestData = () => async (dispatch) => {
            const response = await fetch(url)
            if (response.ok) {
                const result = await response.json()
                console.log(result)
                dispatch(updateData(result))
            } else {
                console.log('HTTP error: ' + response.status)
            }
        }
        dispatch(asyncRequestData())
    }, [dispatch, url])


    return (
        <section>
            <TopBarFilms />
            {
                listFilms.length < 4 ?
                    <div className={classes.spinner}>
                        <CircularProgress />
                    </div>
                    :
                    <React.Fragment>
                        <div className={classes.lists_planet}>
                            {listFilms}
                        </div>
                        <div className={classes.table_pagination}>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={count}
                                rowsPerPage={10}
                                page={currentPage}
                                onChangePage={handleChangePage}
                            />
                        </div>
                    </React.Fragment>
            }
        </section>
    )
}