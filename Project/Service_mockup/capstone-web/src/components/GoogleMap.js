import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
const apiConfig = require('../config');
console.log(apiConfig['key']['googleMap']);

const GoogleMap = ({ children, ...props }) => (


    <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
            key: apiConfig['key']['googleMap'],
        }}
        defaultCenter={props.center}
        {...props}
    >
        {children}
    </GoogleMapReact>

);

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};
export default GoogleMap;