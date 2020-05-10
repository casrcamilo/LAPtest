/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Button, IconButton } from '@material-ui/core';
import firebase from '../../utils/firebaseConfiguration.js';

/** API */
import { Users } from '../../api/users';

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


export default LoginButton = () => {
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
            if ( Users.findOne({_id: result.user.uid}) ){
                console.log("existe");
            } else {
                console.log("no existe");
                Users.insert({
                    _id: result.user.uid,
                    auth_provider: result.credential.providerId,
                    name: result.user.displayName,
                    profile_img: result.user.photoURL,
                    email: result.user.email
                })
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