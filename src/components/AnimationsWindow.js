import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImageUploadButton from './ImageUploadButton';
import {setSelectedAnimationIndex} from '../ducks/selection';
import {newAnimation} from '../ducks/animation';

import Window from './Window';
import WindowItemList from './WindowItemList';

export class AnimationsWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    setSelectedAnimationIndex: PropTypes.func,
    newAnimation: PropTypes.func,

    // Deprecated
    onImageChange: PropTypes.func,
  };

  get animations() {
    return this.props.animations || [];
  }

  render() {
    const {
      selectedAnimationIndex,
      setSelectedAnimationIndex,
      newAnimation,
    } = this.props;
    return (
      <Window
        title="Animations"
        titleButtonAction={newAnimation}
      >
        <WindowItemList
          items={this.animations}
          selectedIndex={selectedAnimationIndex}
          onItemClick={setSelectedAnimationIndex}
        />
        <ImageUploadButton onChange={this.props.onImageChange} />
      </Window>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['animation'].get('animations'),
    selectedAnimationIndex: state['selection'].get('selectedAnimationIndex'),
  };
}

const mapDispatchToProps = {
  setSelectedAnimationIndex,
  newAnimation,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimationsWindow);
