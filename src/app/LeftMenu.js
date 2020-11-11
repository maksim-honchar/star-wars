import React from 'react'
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
            <Link to="/films" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Films" />
                </ListItem>
            </Link>
            <Link to="/planets" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Planets" />
                </ListItem>
            </Link>
        </div>
    )
}
