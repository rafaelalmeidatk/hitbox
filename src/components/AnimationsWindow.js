import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImageUploadButton from './ImageUploadButton';
import {setSelectedAnimationIndex, setSelectedItemId} from '../ducks/selection';
import {newAnimation} from '../ducks/animation';

import Window from './Window';
import WindowItemList from './WindowItemList';

export class AnimationsWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    setSelectedAnimationIndex: PropTypes.func,
    setSelectedItemId: PropTypes.func,
    newAnimation: PropTypes.func,

    // Deprecated
    onImageChange: PropTypes.func,
  };

  get animations() {
    return this.props.animations || [];
  }

  animationByIndex = (index) => {
    const {animations} = this.props;
    return animations.getIn([
      index,
    ]);
  }

  handleOnItemClick = (index) => {
    const {setSelectedAnimationIndex, setSelectedItemId} = this.props;
    var frame = this.animationByIndex(index);
    setSelectedAnimationIndex(index);
    setSelectedItemId(frame.get('_id'));
  }

  render() {
    const {
      selectedAnimationIndex,
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
          onItemClick={(index) => this.handleOnItemClick(index)}
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
  setSelectedItemId,
  newAnimation,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimationsWindow);
