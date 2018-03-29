import React from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { Layer} from 'react-konva';

export default class GridLayer extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    size: PropTypes.number,
  };

  componentDidMount() {
    const { width, height, size } = this.props;

    for (let i = 0; i < width / size; i++) {
      this.gridlayer.add(new Konva.Line({
        points: [Math.round(i * size) + 0.5, 0, Math.round(i * size) + 0.5, height],
        stroke: '#dadada',
        strokeWidth: 1,
      }));
    }

    for (let i = 0; i < height / size; i++) {
      this.gridlayer.add(new Konva.Line({
        points: [0, Math.round(i * size), width, Math.round(i * size)],
        stroke: '#dadada',
        strokeWidth: 1,
      }));
    }
  }

  render() {
    return (
      <Layer ref={(node) => this.gridlayer = node} />
    );
  }
}
