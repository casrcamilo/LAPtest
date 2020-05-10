/** Libraries */
import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles/';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'

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
                    <Button color="secondary" 
                            variant="outlined"
                            className={classes.Button_Login}
                    >
                        Sign Up
                    </Button>
                    <Button color="secondary" 
                            variant="contained"
                            className={classes.Button_Login}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
        
    )
};