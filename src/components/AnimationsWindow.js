import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageUploadButton from './ImageUploadButton';
// import { setSelectedAnimationId, setSelectedItemId } from '../ducks/selection';
import { newAnimation } from '../ducks/objects';

import Window from './Window';
//import WindowItemList from './WindowItemList';

export class AnimationsWindow extends React.Component {
  static propTypes = {
    animations: PropTypes.object,
    selectedAnimationId: PropTypes.string,
    setSelectedAnimationId: PropTypes.func,
    newAnimation: PropTypes.func,

    // Deprecated
    onImageChange: PropTypes.func,
  };

  get animations() {
    return (this.props.animations && this.props.animations.valueSeq().toArray()) || [];
  }

  handleOnItemClick = id => {
    const { setSelectedAnimationId } = this.props;
    setSelectedAnimationId(id);
  };

  render() {
    const { selectedAnimationId, newAnimation } = this.props;
    return (
      <Window title="Animations" titleButtonAction={newAnimation}>
        {/* <WindowItemList
          items={this.animations}
          selectedId={selectedAnimationId}
          onItemClick={(id) => this.handleOnItemClick(id)}
        /> */}

        <ImageUploadButton onChange={this.props.onImageChange} />
      </Window>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state['objects'].get('animations'),
    // selectedAnimationId: state['selection'].get('selectedAnimationId'),
  };
}

const mapDispatchToProps = {
  // setSelectedAnimationId,
  // setSelectedItemId,
  newAnimation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimationsWindow);
