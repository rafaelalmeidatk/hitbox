import React from 'react';
import PropTypes from 'prop-types';

const Window = ({ title, children, ...props }) =>
  <div className="window" {...props}>
    <h1>{title}</h1>
    {children}
  </div>;

Window.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Window;