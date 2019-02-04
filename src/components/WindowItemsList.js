import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ButtonGroup, Icon, Button, Alignment } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { toggleObjectVisibility } from '../ducks/ui';

const VisibilityItemButton = ({ isItemHidden, onItemVisibilityClick }) => (
  <Icon
    icon={isItemHidden ? IconNames.EYE_OFF : IconNames.EYE_OPEN}
    onClick={e => {
      e.stopPropagation();
      onItemVisibilityClick();
    }}
  />
);

const DeleteItemButton = ({ onItemDeleteClick }) => (
  <Icon
    icon={IconNames.SMALL_CROSS}
    onClick={e => {
      e.stopPropagation();
      onItemDeleteClick();
    }}
  />
);

const WindowItemsList = ({
  items,
  itemName,
  selectedId,
  onItemClick,
  onItemDeleteClick,
  objectsHideList,
  toggleObjectVisibility,
}) => (
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
          rightIcon={
            <React.Fragment>
              <VisibilityItemButton
                isItemHidden={!!objectsHideList[item.id]}
                onItemVisibilityClick={() => toggleObjectVisibility(item.id)}
              />
              <DeleteItemButton
                onItemDeleteClick={() => onItemDeleteClick(item.id, index)}
              />
            </React.Fragment>
          }
        >
          {itemName ? itemName(index, item.name) : `${index + 1}. ${item.name}`}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);

VisibilityItemButton.propTypes = {
  isItemHidden: PropTypes.bool,
  onItemVisibilityClick: PropTypes.func.isRequired,
};

DeleteItemButton.propTypes = {
  onItemDeleteClick: PropTypes.func.isRequired,
};

WindowItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  itemName: PropTypes.func,
  selectedId: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
  onItemDeleteClick: PropTypes.func.isRequired,
  objectsHideList: PropTypes.object.isRequired,
  toggleObjectVisibility: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    objectsHideList: state['ui'].objectsHideList,
  };
}

const mapDispathToProps = {
  toggleObjectVisibility,
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(WindowItemsList);
