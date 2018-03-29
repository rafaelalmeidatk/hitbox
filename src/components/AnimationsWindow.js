import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImageUploadButton from './ImageUploadButton';
import {setSelectedAnimationIndex} from '../ducks/selection';

import Window from './Window';
import WindowItemList from './WindowItemList';

export class AnimationsWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationIndex: PropTypes.number,
    setSelectedAnimationIndex: PropTypes.func,

    // Deprecated
    onAddAnimationClick: PropTypes.func,
    onImageChange: PropTypes.func,
  };

  get animations() {
    return this.props.animations || [];
  }

  render() {
    const { selectedAnimationIndex, setSelectedAnimationIndex } = this.props;
    return (
      <Window title="Animations">
        <WindowItemList
          items={this.animations}
          selectedIndex={selectedAnimationIndex}
          onItemClick={setSelectedAnimationIndex}
        />

        <button onClick={this.props.onAddAnimationClick}>Add animation</button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimationsWindow);
