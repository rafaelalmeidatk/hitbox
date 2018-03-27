import React from 'react';
import ImageUploadButton from '../ImageUploadButton';
import './styles.css';

export default class Animations extends React.Component {
  render() {
    return (
      <div>
        <div className="column">
          <h1>Animations</h1>
          <button onClick={this.props.onAddAnimationClick}>Add animation</button>
          <ImageUploadButton onChange={this.props.onImageChange} />
        </div>
      </div>
    );
  }
}
