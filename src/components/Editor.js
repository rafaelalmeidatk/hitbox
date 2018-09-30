import Konva from 'konva';
import PropTypes from 'prop-types';
import React from 'react';
import { Group, Layer, Stage } from 'react-konva';
import GridLayer from './GridLayer';
import SpriteImage from './SpriteImage';
import FramesLayer from './FramesLayer';
import CollidersLayer from './CollidersLayer';

export default class Editor extends React.Component {
  state = {
    spriteSize: { width: 0, height: 0 },
    layersPosition: { x: 0, y: 0 },
  };

  componentDidMount() {
    // Remove AA
    const context = this.mainLayer.getContext()._context;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    window.addEventListener('wheel', this.handleWheel);
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel);
  }

  createFrame = () => {
    var rect = new Konva.Rect({
      x: 50,
      y: 50,
      fill: 'orange',
      draggable: true,
      width: 50,
      height: 50,
      opacity: 0.5,
    });
    this.boxesGroup.add(rect);
    this.stage.getStage().batchDraw();
  };

  changeImage = data => {
    this.sprite.changeImage(data);
  };

  handleImageLoaded = imageData => {
    const layer = this.stage.getStage();
    const x = Math.floor((layer.width() - imageData.width) / 2);
    const y = Math.floor((layer.height() - imageData.height) / 2);
    this.setState({
      spriteSize: { width: imageData.width, height: imageData.height },
      layersPosition: { x, y },
    });
  };

  handleWheel = e => {
    const stage = this.stage.getStage();
    const layer = this.stage.getStage();
    const scaleBy = 2;
    if (!stage.getPointerPosition()) return;

    e.preventDefault();
    var oldScale = layer.scaleX();

    var mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - layer.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - layer.y() / oldScale,
    };

    var newScale = e.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    layer.scale({ x: newScale, y: newScale });

    var newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    layer.position(newPos);
    stage.batchDraw();
  };

  render() {
    const { spriteSize, layersPosition } = this.state;

    return (
      <Stage
        ref={node => (this.stage = node)}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={true}
      >
        <GridLayer
          x={layersPosition.x}
          y={layersPosition.y}
          width={spriteSize.width}
          height={spriteSize.height}
          squareDimensions={32}
        />

        <Layer
          ref={node => (this.mainLayer = node)}
          x={layersPosition.x}
          y={layersPosition.y}
          onWheel={this.onWheel}
        >
          <SpriteImage
            ref={node => (this.sprite = node)}
            onImageLoaded={this.handleImageLoaded}
          />

          <FramesLayer />
          <CollidersLayer />

          <Group ref={node => (this.boxesGroup = node)} />
        </Layer>
      </Stage>
    );
  }
}
