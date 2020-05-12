/** Libraries */
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-google-maps';
import { connect } from 'react-redux'
import { withTracker } from 'meteor/react-meteor-data';

/** API & Utils */
import { Shops } from '../../api/Shops';
import { addShopSelected, openShopDetails, setDefaultCenter } from '../../actions'

const MarkList = ({ shops, addShopSelected, openShopDetails, setDefaultCenter }) => {
    const [ shopClicked, setShopClicked ] = useState(null);
  
    useEffect( () => {
        addShopSelected(shopClicked)
    },[shopClicked])
    
    handleSelectMarkerClick = ( shop ) => {
        setShopClicked(shop);
        setDefaultCenter({'lat': shop.lat, 'lng': shop.lng})
        openShopDetails(true);
    }

    return (
        <>
            {shops.map( shop => {
                return (
                    <Marker 
                        key={shop._id} 
                        position={{ lat: shop.lat, lng: shop.lng }} 
                        onClick={ () => handleSelectMarkerClick( shop )}
                    >
                    </Marker>

                )
            })}
        </>
    )
}

const mapDispatchToProps = {
    addShopSelected,
    openShopDetails,
    setDefaultCenter
}

export default connect(null, mapDispatchToProps)(withTracker(() =>{
    return {
        shops: Shops.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(MarkList));