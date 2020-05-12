/** Libraries */
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

/** Components */
import Comment from './Comment'

/** API & Utils */
import { Califications } from '../../api/Califications';

const CalificationList = ({ shopSelected,  ratings }) => {
    return (
        ratings.map( rating => {
            return (
                <Comment key={rating._id} ratingData={rating} />
            )
        })
    )
}

const mapStateToProps = ( state ) => {
    return {
        shopSelected: state.shopSelected,
    }
}

export default connect(mapStateToProps, null)(withTracker(({ shopSelected }) =>{
    return {
        ratings : Califications.find(
            { shop_id: shopSelected._id}, 
            { sort: { calificatedAt: -1 } }).fetch(),
    };
})(CalificationList));