import React from 'react';
import { Group, Layer, Stage } from 'react-konva';
import GridLayer from './GridLayer';
import SpriteImage from './SpriteImage';
import FramesLayer from './FramesLayer';
import CollidersLayer from './CollidersLayer';

import {
  NAVBAR_HEIGHT,
  ZOOM_MULTIPLIER,
  MAX_ZOOM_MULTIPLIER,
  MIN_ZOOM_MULTIPLIER,
} from '../helpers/constants';

export default class Editor extends React.Component {
  state = {
    canvasSize: {
      width: window.innerWidth,
      height: window.innerHeight - NAVBAR_HEIGHT,
    },
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
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('resize', this.handleResize);
  }

  loadBase64Image = data => {
    this.sprite.loadBase64Image(data);
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
    const isIncrease = e.deltaY < 0;
    const stage = this.stage.getStage();
    const currentScale = stage.scaleX();

    if (
      !stage.getPointerPosition() ||
      (isIncrease && currentScale >= MAX_ZOOM_MULTIPLIER) ||
      (!isIncrease && currentScale <= MIN_ZOOM_MULTIPLIER)
    )
      return;

    e.preventDefault();

    const mousePointTo = {
      x: stage.getPointerPosition().x / currentScale - stage.x() / currentScale,
      y: stage.getPointerPosition().y / currentScale - stage.y() / currentScale,
    };

    const newScale = isIncrease
      ? currentScale * ZOOM_MULTIPLIER
      : currentScale / ZOOM_MULTIPLIER;
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  handleResize = e => {
    this.setState({
      canvasSize: {
        width: e.target.innerWidth,
        height: e.target.innerHeight - NAVBAR_HEIGHT,
      },
    });
  };

  render() {
    const { canvasSize, spriteSize, layersPosition } = this.state;

    return (
      <Stage
        ref={node => (this.stage = node)}
        width={canvasSize.width}
        height={canvasSize.height}
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
