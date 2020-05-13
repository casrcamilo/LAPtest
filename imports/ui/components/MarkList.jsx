/** Libraries */
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-google-maps';
import { connect } from 'react-redux'
import { withTracker } from 'meteor/react-meteor-data';

/** API & Utils */
import { Shops } from '../../api/Shops';
import { defaultShopTypesList } from '../../utils/shoptypes'
import { addShopSelected, openShopDetails, setDefaultCenter } from '../../actions'

/**  */

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

    filterUrlShopTypes = ( shopType ) => {
        var defaultShopType = defaultShopTypesList.filter(defaultShopType => {
            return defaultShopType.value===shopType
        })
        return defaultShopType[0].url
    }

    return (
        <>
            {shops.map( shop => {                
                let shopTypeUrl = filterUrlShopTypes(shop.shopType);
                return (
                    <Marker 
                        key={shop._id} 
                        position={{ lat: shop.lat, lng: shop.lng }} 
                        onClick={ () => handleSelectMarkerClick( shop )}
                        icon={{ url: shopTypeUrl, scaledSize: new google.maps.Size(32, 45) }}
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