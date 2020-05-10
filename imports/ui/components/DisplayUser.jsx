/** Libraries */
import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles/';
import { Container, Typography, Button, Avatar, Menu, MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { connect } from 'react-redux'

/** Api & Utils */
import { logoutRequest } from '../../actions'

/** Styles */
const useStyles = makeStyles( theme => ({
    ButtonProfile:{
        position: 'absolute',
        right: 20,
        top: 0,
    },
    ImgThumbnail: {
        width: 50,
        height: 50,
        marginLeft: 11,
        borderRadius: '50%'
    },
}));

// CSS properties of a new styled menu from MaterialUI Menu Base
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
    })(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
));

const DisplayUser = ({ user, logoutRequest }) => {
    const classes = useStyles();
    const [ anchorEl, setAnchorEl ] = useState(null);

    //Open dropdown Menu
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    //Close dropdown Menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        logoutRequest({});
    }

    return (
        <Container maxWidth="xs">
            <Button className={classes.ButtonProfile} onClick={handleClick} >
                <Typography component="h4">
                    {user.displayName}
                </Typography>
                <Avatar alt="Profile Image" src={user.photoURL} className={classes.ImgThumbnail} />
                <ArrowDropDownIcon/>
            </Button>

            {/* Styled Dropdown Menu */} 
            <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logout} >Cerrar sesión</MenuItem>
            </StyledMenu>
        </Container>
    )
    
}

const mapStateToProps = state => {
    return { user: state.user }
};

const mapDispatchToProps = {
    logoutRequest,
};

export default connect( mapStateToProps, mapDispatchToProps )(DisplayUser);

