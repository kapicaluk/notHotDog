/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const defaultProps = {
  buttonStyle: {},
  textStyle: {},
};

function Button({ onPress, children, buttonStyle, textStyle }) {
  const { button, text } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[button, buttonStyle]}
    >
      <Text style={[text, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    alignSelf: "stretch",
    backgroundColor: "tomato",
    borderRadius: 3,
    marginTop: 10,

    padding: 5,
    opacity: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    position: "relative"
  },
  text: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  }
};

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export { Button };
