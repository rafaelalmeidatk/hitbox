import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Icon, Button, Alignment } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const DeleteItemButton = ({ onItemDeleteClick }) => (
  <Icon icon={IconNames.SMALL_CROSS} onClick={onItemDeleteClick} />
);

const WindowItemsList = ({ items, itemName, selectedId, onItemClick, onItemDeleteClick }) => (
  <div className="window-items-list">
    {(!items || items.length === 0 || items.size === 0) && (
      <div>No items yet!</div>
    )}
    <ButtonGroup vertical fill>
      {items.map((item, index) => (
        <Button
          key={item.id}
          active={selectedId === item.id}
          onClick={() => onItemClick(item.id)}
          alignText={Alignment.LEFT}
          rightIcon={<DeleteItemButton onItemDeleteClick={() => onItemDeleteClick(item.id, index)} />}
        >
          {itemName ? itemName(index, item.name) : `${index + 1}. ${item.name}`}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);

DeleteItemButton.propTypes = {
  onItemDeleteClick: PropTypes.func.isRequired,
};

WindowItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  itemName: PropTypes.func,
  selectedId: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
  onItemDeleteClick: PropTypes.func.isRequired,
};

export default WindowItemsList;
