import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text }) => (<button>Click Me {text}</button>);

Button.propTypes = {
  text: PropTypes.string,
};

Button.defaultProps = {
  text: '',
};

export default Button;
