/** Libraries */
import React from 'react';

/** Components */
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default Layout = ( props ) => {
    return (
        <>
            <Navbar/>    
                {props.children}
            {/*<Footer/>*/}
        </>
    );
}
