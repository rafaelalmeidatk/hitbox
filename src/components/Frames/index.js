import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

export class Frames extends React.Component {
  static propTypes = {
    frames: PropTypes.array,
  }

  get frames() {
    return this.props.frames || [];
  }

  render() {
    return (
      <div className="left-window">
        <h1>Frames</h1>
        <ul>
          {
            !this.frames.length &&
            <div>No frames yet!</div>
          }
          {this.frames.map((frame, index) =>
            <li key={frame.get('_id')}>
              {++index}. {frame.get('name')}
            </li>
          )}
        </ul>
        <button>Add frames</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    frames: [],
  };
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Frames);
