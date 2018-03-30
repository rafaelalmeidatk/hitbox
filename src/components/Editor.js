import React from 'react';
import { Stage, Layer, Group } from 'react-konva';
import SpriteImage from './SpriteImage';
import Konva from 'konva';
import GridLayer from './GridLayer';

export default class Editor extends React.Component {
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
  }

  changeImage = (data) => {
    this.sprite.changeImage(data);
  }

  handleImageLoaded = (imageData) => {
    const layer = this.mainLayer;
    const x = Math.floor((layer.width() - imageData.width) / 2);
    const y = Math.floor((layer.height() - imageData.height) / 2);
    layer.position({ x, y });
  }

  handleWheel = (e) => {
    const stage = this.stage.getStage();
    const layer = this.mainLayer;
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
  }

  render() {
    return (
      <Stage
        ref={node => this.stage = node}
        width={window.innerWidth}
        height={window.innerHeight}>
        <GridLayer width={window.innerWidth} height={window.innerWidth} size={28} />

        <Layer 
          ref={node => this.mainLayer = node}
          onWheel={this.onWheel} 
          draggable={true}>
          <SpriteImage
            ref={node => this.sprite = node}
            onImageLoaded={this.handleImageLoaded}
          />
          <Group ref={node => this.boxesGroup = node} />
        </Layer>
      </Stage>
    );
  }
}
