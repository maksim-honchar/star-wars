import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AppsIcon from '@material-ui/icons/Apps'

const useStyles = makeStyles({
    wrapper: {
        // width: 200,
    },
    link: {
        textDecoration: 'none',
        color: '#212121'
    }
})

export const LeftMenu = () => {
    const classes = useStyles()
    const [sections, setSections] = useState([])

    const listsSections = sections.map(section => (
        <Link to={`/${section}`} className={classes.link} key={section}>
            <ListItem button>
                <ListItemIcon>
                    <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={`${section.slice(0, 1).toUpperCase()}${section.slice(1).toLowerCase()}`} />
            </ListItem>
        </Link>
    ))

    useEffect(() => {
        fetch('https://swapi.dev/api/')
            .then(response => response.json())
            .then(result => setSections(Object.keys(result)))
    }, [])

    return (
        <div className={classes.wrapper}>
            <Link to="/" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </Link>
            {listsSections}
        </div>
    )
}
