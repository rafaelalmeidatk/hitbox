import React from 'react';
import {connect} from 'react-redux';
import ImageUploadButton from '../ImageUploadButton';
import './styles.css';
import {setSelectedAnimationIndex} from '../../ducks/selection';
import classNames from 'classnames';

export class Animations extends React.Component {
  get animations() {
    return this.props.animations || [];
  }

  render() {
    const { selectedAnimationIndex, setSelectedAnimationIndex } = this.props;
    return (
      <div className="left-window">
        <h1>Animations</h1>
        <ul>
          {
            !this.animations.length &&
            <div>No animations yet!</div>
          }
          {this.animations.map((animation, index) =>
            <li
              key={animation.get('_id')}
              className={classNames({ 'selected': selectedAnimationIndex === index })}
              onClick={() => setSelectedAnimationIndex(index)}
              >
              {index + 1}. {animation.get('name')}
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
    animations: state['animation'].get('animations'),
    selectedAnimationIndex: state['selection'].get('selectedAnimationIndex'),
  };
}

const mapDispatchToProps = {
  setSelectedAnimationIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(Animations);
