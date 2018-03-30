import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WindowItemList = ({ items, itemName, selectedIndex, onItemClick }) => (
  <ul>
    {
      items.length === 0 &&
      <div>No items yet!</div>
    }
    {items.map((item, index) =>
      <li
        key={item.get('_id')}
        className={classNames({ 'selected': selectedIndex === index })}
        onClick={() => onItemClick(index)}
      >
        {
          itemName
            ? itemName(index, item.get('name'))
            : (`${index + 1}. ${item.get('name')}`)
        }
      </li>
    )}
  </ul>
);

WindowItemList.propTypes = {
  items: PropTypes.object.isRequired,
  itemName: PropTypes.func,
  selectedIndex: PropTypes.number,
  onItemClick: PropTypes.func.isRequired,
};

export default WindowItemList;