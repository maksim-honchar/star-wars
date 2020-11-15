import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { updateData, updateCurrentPage, selectCount, selectScpecies, selectNext, selectPrevious, selectCurrentPage } from './speciesSlice'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'

import { TopBarSpecies } from './TopBarSpecies'
import { LeftMenu } from '../app/LeftMenu'

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
    },
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
    content: {
        margin: 'auto'
    },
    table_pagination: {
        marginTop: 30
    }
})


export const SpeciesPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const count = useSelector(selectCount)
    const species = useSelector(selectScpecies)
    const nextUrlPage = useSelector(selectNext)
    const prevUrlPage = useSelector(selectPrevious)
    const currentPage = useSelector(selectCurrentPage)

    const [url, setUrl] = useState(`https://swapi.dev/api/species/?page=${currentPage + 1}`)

    const handleChangePage = (event, newPage) => {
        if (currentPage < newPage) {
            dispatch(updateCurrentPage(newPage))
            setUrl(nextUrlPage)
        } else {
            dispatch(updateCurrentPage(newPage))
            setUrl(prevUrlPage)
        }
    }

    let listsPeople

    if (species) {
        listsPeople = species.map(kind => (
            <Link to={`/species/${kind.name}`} className={classes.link} key={kind.name}>
                <Card className={classes.card} variant="outlined" >
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {kind.name}
                        </Typography>
                        <hr />
                        <br />
                        <Typography component="p" >
                            Average lifespan: <span className={classes.headlines}>{kind.average_lifespan}</span>
                        </Typography>
                        <br />
                        <Typography component="p" >
                            Language:  <span className={classes.headlines}>{kind.language}</span>
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
        const asyncRequestData = () => async (dispatch) => {
            const response = await fetch(url)
            if (response.ok) {
                const result = await response.json()
                dispatch(updateData(result))
            } else {
                console.log('HTTP error: ' + response.status)
            }
        }
        dispatch(asyncRequestData())
    }, [dispatch, url])


    return (
        <section>
            <TopBarSpecies />
            <div className={classes.wrapper}>
                <div className={classes.leftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        listsPeople.length < 4 ?
                            <div className={classes.spinner}>
                                <CircularProgress />
                            </div>
                            :
                            <React.Fragment>
                                <div className={classes.lists_planet}>
                                    {listsPeople}
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
                </div>
            </div>
        </section>
    )
}