import React from 'react';
import PropTypes from 'prop-types';
import PlusIcon from 'react-icons/lib/fa/plus';

const Window = ({ title, titleButtonAction, children, ...props }) =>
  <div className="window" {...props}>
    <div className="title">
      <h1>{title}</h1>
      {
        titleButtonAction &&
        <span className="icon">
          <PlusIcon onClick={titleButtonAction} />
        </span>
      }
    </div>
    {children}
  </div>;

Window.propTypes = {
  title: PropTypes.string,
  titleButtonAction: PropTypes.func,
  children: PropTypes.node,
};

export default Window;