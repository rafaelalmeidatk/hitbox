import React from 'react';
import {connect} from 'react-redux';
import ImageUploadButton from '../ImageUploadButton';
import './styles.css';

export class Animations extends React.Component {
  get animations() {
    return this.props.animations || [];
  }

  render() {
    return (
      <div className="left-window">
        <h1>Animations</h1>
        <ul>
          {
            !this.animations.length &&
            <div>No animations yet!</div>
          }
          {this.animations.map((animation, index) =>
            <li key={animation.get('_id')}>
              {++index}. {animation.get('name')}
            </li>
          )}
        </ul>
        <button onClick={this.props.onAddAnimationClick}>Add animation</button>
        <ImageUploadButton onChange={this.props.onImageChange} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    animations: state.get('animations'),
  };
}

export default connect(mapStateToProps)(Animations);
