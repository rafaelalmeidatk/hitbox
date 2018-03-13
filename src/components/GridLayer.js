import React from 'react';
import Konva from 'konva';
import { Layer} from 'react-konva';

export default class GridLayer extends React.Component {
  componentDidMount() {
    const { width, height, size } = this.props;
    const {gridlayer} = this.refs;

    for (let i = 0; i < width / size; i++) {
      gridlayer.add(new Konva.Line({
        points: [Math.round(i * size) + 0.5, 0, Math.round(i * size) + 0.5, height],
        stroke: '#dadada',
        strokeWidth: 1,
      }));
    }

    for (let i = 0; i < height / size; i++) {
      gridlayer.add(new Konva.Line({
        points: [0, Math.round(i * size), width, Math.round(i * size)],
        stroke: '#dadada',
        strokeWidth: 1,
      }));
    }
  }

  render() {
    return (
      <Layer ref="gridlayer" />
    );
  }
}
