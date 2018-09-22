import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const Window = ({ title, titleActionButton, titleActionButtonEnabled, children, ...props }) => (
  <Card className="window" {...props}>
    <div className="title">
      <h4 className="bp3-heading">{title}</h4>
      {titleActionButton && (
        <span className="icon">
          <Button
            onClick={titleActionButton}
            icon={IconNames.PLUS}
            small
            disabled={!titleActionButtonEnabled}
          />
        </span>
      )}
    </div>
    {children}
  </Card>
);

Window.propTypes = {
  title: PropTypes.string,
  titleActionButton: PropTypes.func,
  titleActionButtonEnabled: PropTypes.bool,
  children: PropTypes.node,
};

Window.defaultProps = {
  titleActionButtonEnabled: true,
};

export default Window;
