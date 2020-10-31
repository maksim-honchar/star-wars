import React, { useEffect } from 'react'

import { asyncRequestData, selectPlanets } from './planetsSlice'
import { useDispatch, useSelector } from 'react-redux'


export const HomePage = () => {

    const dispatch = useDispatch()

    const planets = useSelector(selectPlanets)
    console.log(planets)

    let rendered

    if (planets) {
        rendered = planets.map(planet => <p key={planet.name}>{planet.name}</p>)
    }


    useEffect(() => {
        dispatch(asyncRequestData())
    }, [dispatch])



    return (
        <div>
            { rendered}
        </div>

    )
}