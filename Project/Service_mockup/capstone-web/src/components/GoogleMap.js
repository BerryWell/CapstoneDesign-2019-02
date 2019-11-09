import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
const apiConfig = require('../config');
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;
//console.log({ 'console.log(process.env.REACT_APP_MAP_KEY);': process.env.REACT_APP_MAP_KEY });
const GoogleMap = ({ children, ...props }) => (


    <GoogleMapReact
        bootstrapURLKeys={{
            key: apiConfig['key']['googleMap'],
        }}
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

GoogleMap.defaultProps = {
    children: null,
};

export default GoogleMap;