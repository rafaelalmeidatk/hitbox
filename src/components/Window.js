import React from 'react';
import PropTypes from 'prop-types';

const Window = ({ title, children, ...props }) =>
  <div className="left-window" {...props}>
    <h1>{title}</h1>
    {children}
  </div>;

Window.propTypes = {
  title: PropTypes.string,
};

export default Window;