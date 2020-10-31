import React, { useState, useEffect } from 'react'
import TablePagination from '@material-ui/core/TablePagination'

import { updateData, selectCount, selectPlanets, selectNext, selectPrevious } from './planetsSlice'
import { useDispatch, useSelector } from 'react-redux'



export const HomePage = () => {
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

    const asyncRequestData = state => async (dispatch) => {
        const response = await fetch(url)
        if (response.ok) {
            const result = await response.json()
            // console.log(result)
            dispatch(updateData(result))
        } else {
            console.log('HTTP error: ' + response.status)
        }
    }

    let rendered

    if (planets) {
        rendered = planets.map(planet => <p key={planet.name}>{planet.name}</p>)
    }


    useEffect(() => {
        dispatch(asyncRequestData())
    }, [page])



    return (
        <section>
            {rendered}
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={count}
                rowsPerPage={10}
                page={page}
                onChangePage={handleChangePage}
            />
        </section>
    )
}