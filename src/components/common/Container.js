/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = props => (
  <View style={[styles.container]}>
    {props.children}
  </View>
);

const styles = {
  container: {
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    paddingTop: 5,
    paddingBottom: 10
  }
};

Container.propTypes = propTypes;

export { Container };
