import React from 'react';
import PropTypes from 'prop-types';

const Label = props => (<div>Labels {props.text}</div>);

Label.defaultProps = {
  text: '',
};

Label.propTypes = {
  text: PropTypes.string,
};

export default Label;
