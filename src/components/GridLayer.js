import React from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';
import { Layer, Rect } from 'react-konva';

export default class GridLayer extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    squareDimensions: PropTypes.number,
  };

  componentDidMount() {
    this.drawGrid();
  }

  componentDidUpdate() {
    this.drawGrid();
  }

  drawGrid = () => {
    const { width, height, squareDimensions } = this.props;

    this.gridLayer.clear();

    for (let i = 0; i < width / squareDimensions; i++) {
      this.gridLayer.add(
        new Konva.Line({
          points: [
            Math.round(i * squareDimensions) + 0.5,
            0,
            Math.round(i * squareDimensions) + 0.5,
            height,
          ],
          stroke: '#dadada',
          strokeWidth: 1,
        })
      );
    }

    for (let i = 0; i < height / squareDimensions; i++) {
      this.gridLayer.add(
        new Konva.Line({
          points: [
            0,
            Math.round(i * squareDimensions),
            width,
            Math.round(i * squareDimensions),
          ],
          stroke: '#dadada',
          strokeWidth: 1,
        })
      );
    }
  };

  render() {
    const { width, height, x, y } = this.props;
    return (
      <Layer x={x} y={y} ref={node => (this.gridLayer = node)}>
        <Rect
          fill="#fff"
          width={width}
          height={height}
          shadowBlur={20}
          shadowColor="rgba(0, 0, 0, 0.2)"
        />
      </Layer>
    );
  }
}
