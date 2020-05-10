/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Button, IconButton } from '@material-ui/core';
import firebase from '../../utils/firebaseConfiguration.js';
import { connect } from 'react-redux';


/** API & Utils*/
import { Users } from '../../api/users';
import { loginRequest } from '../../actions'

/** Icons */
import { Icon, InlineIcon } from '@iconify/react';
import google from '@iconify/icons-mdi/google';
import facebook from '@iconify/icons-mdi/facebook';

/** Styles */
const useStyles = makeStyles(theme => ({
    Button_LoginFacebook:{
        marginLeft: theme.spacing(2),
        backgroundColor: '#3a5997',
        color: '#fff',
        '&:hover':{
            backgroundColor: '#365899'
        }
    },
    Button_LoginGoogle:{
        marginLeft: theme.spacing(2),
        backgroundColor: '#fff',
    },    
}));


const LoginButton = ( props ) => {
    const classes = useStyles();

    facebookProvider = () => {
        let provider = new firebase.auth.FacebookAuthProvider();
        login(provider);
    }

    googleProvider = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        login(provider);
    }

    login = provider => {
        firebase.auth().signInWithPopup(provider).then( result => {
            // Get data
            let { uid, displayName, photoURL, email } = result.user;
            let { providerId } = result.credential

            // the user already exists?
            if ( Users.findOne({_id: uid}) ){
                //set user in store
                props.loginRequest( Users.findOne({_id: uid}) )
            } else {
                //insert new user in Mongodb
                Users.insert({
                    _id: uid,
                    providerId,
                    displayName,
                    photoURL,
                    email
                })
                //set user in store
                props.loginRequest( Users.findOne({_id: uid}) )
            }
        }).catch( error => {
            console.log(error)
        });         
    }

    return(
        <>
            <Button  
                variant="contained"
                className={classes.Button_LoginFacebook}
                onClick={facebookProvider}
                startIcon={<InlineIcon icon={facebook}/>}
            >
                Ingresar Con Facebook
            </Button>
            
            <Button  
                variant="contained"
                className={classes.Button_LoginGoogle}
                onClick={googleProvider}
                startIcon={<InlineIcon icon={google}/>}
            >
                Ingresar Con Google
            </Button>
        </>
    )
};

const mapDispatchToProps = {
    loginRequest,
}

export default connect(null, mapDispatchToProps)(LoginButton);