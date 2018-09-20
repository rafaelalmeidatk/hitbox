import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Alignment } from '@blueprintjs/core';

const WindowItemsList = ({ items, itemName, selectedId, onItemClick }) => (
  <div className="window-items-list">
    {(!items || items.length === 0 || items.size === 0) && <div>No items yet!</div>}
    <ButtonGroup vertical fill>
      {items.map((item, index) => (
        <Button
          key={item.id}
          active={selectedId === item.id}
          onClick={() => onItemClick(item.id)}
          alignText={Alignment.LEFT}
        >
          {itemName ? itemName(index, item.name) : `${index + 1}. ${item.name}`}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);

WindowItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  itemName: PropTypes.func,
  selectedId: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
};

export default WindowItemsList;
