import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const WindowToolsRow = ({ onClick, visibility, visibilityValue }) => (
  <ul className="window-tools-row">
    <ButtonGroup fill>
      {visibility && (
        <li className="window-tools-icon">
          <Button onClick={onClick}>
            {visibilityValue ? (
              <Icon icon={IconNames.EYE_OPEN} size={14} />
            ) : (
              <Icon icon={IconNames.EYE_OFF} size={14} />
            )}
          </Button>
        </li>
      )}
    </ButtonGroup>
  </ul>
);

WindowToolsRow.propTypes = {
  visibility: PropTypes.bool,
  visibilityValue: PropTypes.bool,
  onClick: PropTypes.func,
};

export default WindowToolsRow;
