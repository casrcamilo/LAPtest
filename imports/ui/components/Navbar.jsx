/** Libraries */
import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles/';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'

/** Components */
import LoginButton from './LoginButton'

/** Styles */
import theme from '../../styles/Theme';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    Button_Login:{
        marginLeft: theme.spacing(2)
    }
}));

export default Navbar = () => {

    const classes = useStyles();

    return(
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Recomendaciones
                    </Typography>
                    <LoginButton/>
 
                </Toolbar>
            </AppBar>
        </ThemeProvider>
        
    )
};