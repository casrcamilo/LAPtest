/** Libraries */
import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Fab, Paper } from '@material-ui/core';
import { connect } from 'react-redux';

/** Components */
import AddShopForm from './AddShopForm'

/** API & Utils */
import { openAddShopForm } from '../../actions'

/** Icons */
import AddIcon from '@material-ui/icons/Add';

/** Styles */
import theme from '../../styles/Theme';

const useStyles = makeStyles(theme => ({
    AddButton:{
        position: 'absolute',
        bottom: '3vh',
        left: '1.5vw',
        height: 56,
    },
    Paper:{
        height: '70vh',
        position: 'absolute',
        top: '15vh',
        left: '0.5vw',
        padding: '10px'
    }
}));

const AddShop = ({ openForm, openAddShopForm }) => {
    const classes = useStyles(); 
    const [ hoverButton, setHoverButton ] = useState(false)

    handleClick = () => {
        openAddShopForm(true)
    };

    handleEnterHover = () => {
        setHoverButton(true);
    };

    handleLeaveHover = () => {
        setHoverButton(false);
    };

    return (
        <ThemeProvider theme={theme}>  
            {openForm 
            &&  <Paper 
                    elevation={3} 
                    children={<AddShopForm/>} 
                    className={classes.Paper}
                />
            }     
            <Fab 
                color="primary" 
                aria-label="add" 
                className={classes.AddButton}
                onClick={() => handleClick()}
                onMouseEnter={( ) => handleEnterHover( )}
                onMouseLeave={( ) => handleLeaveHover( )}
                variant={hoverButton ? "extended" : "round"}

            >
                <AddIcon />
                {hoverButton ? "Agregar Establecimiento" : null}
            </Fab>
        </ThemeProvider>
    )
}

const mapStateToProps = ( state ) => {
    return{
        openForm: state.openAddShopForm,
    }
}

const mapDispatchToProps = {
    openAddShopForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);