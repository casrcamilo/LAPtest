/** Libraries */
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux'

/** Components */
import Comment from './Comment'

/** API & Utils */
import { Califications } from '../../api/Califications';

const CalificationList = ({ shopSelected, califications }) => {
    return (
        califications.map( calification => {
            return (
                <Comment key={calification._id} calificationData={calification} />
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
        califications: Califications.find({ shop_id: shopSelected._id}, { sort: { calificated: -1 } }).fetch(),
    };
})(CalificationList));