import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { updateData, updateCurrentPage, selectCount, selectPeople, selectNext, selectPrevious, selectCurrentPage } from './peopleSlice'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'

import { TopBarPeople } from './TopBarPeople'
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
    spinner: {
        margin: '300px 650px'
    },
    table_pagination: {
        marginTop: 30
    }
})


export const PeoplePage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const count = useSelector(selectCount)
    const people = useSelector(selectPeople)
    const nextUrlPage = useSelector(selectNext)
    const prevUrlPage = useSelector(selectPrevious)
    const currentPage = useSelector(selectCurrentPage)

    const [url, setUrl] = useState(`https://swapi.dev/api/people/?page=${currentPage + 1}`)

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

    if (people) {
        listsPeople = people.map(person => (
            <Link to={`/people/${people.name}`} className={classes.link} key={person.name}>
                <Card className={classes.card} variant="outlined" >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {person.name}
                        </Typography>
                        <hr />
                        <br />
                        <Typography component="p" >
                            Year of birth: <span className={classes.headlines}>{person.birth_year}</span>
                        </Typography>
                        <br />
                        <Typography component="p" >
                            Gender:  <span className={classes.headlines}>{person.gender}</span>
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
            <TopBarPeople />
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