import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { updateData, updateCurrentPage, selectCount, selectVehicle, selectNext, selectPrevious, selectCurrentPage } from './vehicleSlice'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'

import { TopBarVehicle } from './TopBarVehicle'
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


export const VehiclePage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const count = useSelector(selectCount)
    const vehicle = useSelector(selectVehicle)
    const nextUrlPage = useSelector(selectNext)
    const prevUrlPage = useSelector(selectPrevious)
    const currentPage = useSelector(selectCurrentPage)

    const [url, setUrl] = useState(`https://swapi.dev/api/vehicles/?page=${currentPage + 1}`)

    const handleChangePage = (event, newPage) => {
        if (currentPage < newPage) {
            dispatch(updateCurrentPage(newPage))
            setUrl(nextUrlPage)
        } else {
            dispatch(updateCurrentPage(newPage))
            setUrl(prevUrlPage)
        }
    }

    let listsVehicle

    if (vehicle) {
        listsVehicle = vehicle.map(transport => (
            <Link to={`/vehicles/${transport.name}`} className={classes.link} key={transport.name}>
                <Card className={classes.card} variant="outlined" >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {transport.name}
                        </Typography>
                        <hr />
                        <br />
                        <Typography component="p" >
                            Cargo capacity: <span className={classes.headlines}>{transport.cargo_capacity}</span>
                        </Typography>
                        <br />
                        <Typography component="p" >
                            Vehicle class:  <span className={classes.headlines}>{transport.vehicle_class}</span>
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
            <TopBarVehicle />
            <div className={classes.wrapper}>
                <div className={classes.leftMenu}>
                    <LeftMenu />
                </div>
                <div className={classes.content}>
                    {
                        listsVehicle.length < 4 ?
                            <div className={classes.spinner}>
                                <CircularProgress />
                            </div>
                            :
                            <React.Fragment>
                                <div className={classes.lists_planet}>
                                    {listsVehicle}
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