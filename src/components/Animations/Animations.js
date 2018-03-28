import React from 'react';
import {connect} from 'react-redux';
import ImageUploadButton from '../ImageUploadButton';
import './styles.css';

export default class Animations extends React.Component {
  get animations() {
    return this.props.animations || [];
  }
  
  render() {
    return (
      <div>
        <div className="column">
          <h1>Animations</h1>
          <ul>
            {this.animations.map(animation =>
              <li key={animation.get('_id')}>
                {animation.get('name')}
              </li>
            )}
          </ul>
          <button onClick={this.props.onAddAnimationClick}>Add animation</button>
          <ImageUploadButton onChange={this.props.onImageChange} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state.get('animations'),
  };
}

export const AnimationsContainer = connect(mapStateToProps)(Animations);
