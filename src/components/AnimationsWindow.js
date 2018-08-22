import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageUploadButton from './ImageUploadButton';
import { setSelectedAnimationId, setSelectedItemId } from '../ducks/selection';
import { newAnimation } from '../ducks/objects';

import Window from './Window';
import WindowItemsList from './WindowItemsList';

class AnimationsWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.array,
    selectedAnimationId: PropTypes.string,
    setSelectedAnimationId: PropTypes.func,
    newAnimation: PropTypes.func,

    // Deprecated
    onImageChange: PropTypes.func,
  };

  get animations() {
    return this.props.animations || [];
  }

  handleOnItemClick = id => {
    const { setSelectedAnimationId } = this.props;
    setSelectedAnimationId(id);
  };

  render() {
    const { selectedAnimationId, newAnimation } = this.props;

    return (
      <Window title="Animations" titleActionButton={newAnimation}>
        <WindowItemsList
          items={this.animations}
          selectedId={selectedAnimationId}
          onItemClick={id => this.handleOnItemClick(id)}
        />

        {/* <ImageUploadButton onChange={this.props.onImageChange} /> */}
      </Window>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['objects'].animations,
    selectedAnimationId: state['selection'].selectedAnimationId,
  };
}

const mapDispatchToProps = {
  setSelectedAnimationId,
  setSelectedItemId,
  newAnimation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimationsWindow);
