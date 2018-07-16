import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const Window = ({ title, titleButtonAction, children, ...props }) => (
  <Card className="window" {...props}>
    <div className="title">
      <h4 className="bp3-heading">{title}</h4>
      {titleButtonAction && (
        <span className="icon">
          <Button onClick={titleButtonAction} icon={IconNames.PLUS} small />
        </span>
      )}
    </div>
    {children}
  </Card>
);

Window.propTypes = {
  title: PropTypes.string,
  titleButtonAction: PropTypes.func,
  children: PropTypes.node,
};

export default Window;
