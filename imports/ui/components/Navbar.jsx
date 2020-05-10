/** Libraries */
import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles/';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux'

/** Components */
import LoginButton from './LoginButton'
import DisplayUser from './DisplayUser'

/** Styles */
import theme from '../../styles/Theme';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = ( props ) => {
    const { user } = props;
    const hasUser = Object.keys(user).length > 0;
    const classes = useStyles();

    return(
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Recomendaciones
                    </Typography>
                    {hasUser
                        ? <DisplayUser />
                        : <LoginButton />
                    }
                </Toolbar>
            </AppBar>
        </ThemeProvider>
        
    )
};

const mapStateToProps = state => {
    return { user: state.user }
};

export default connect( mapStateToProps, null )(Navbar);