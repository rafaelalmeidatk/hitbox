import React from 'react';
import ImageUploadButton from './ImageUploadButton';

export default class Animations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{position: 'absolute',top:0,left:0}}>
        <button onClick={this.props.onAddAnimationClick}>Add animation</button>
        <ImageUploadButton onChange={this.props.onImageChange} />
      </div>
    );
  }
}
