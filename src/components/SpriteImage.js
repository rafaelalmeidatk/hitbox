import React from 'react';
import { Image } from 'react-konva';

export default class SpriteImage extends React.Component {
  state = {
    image: null
  }

  componentDidMount() {
    this.loadImage('http://localhost:3000/player.png');
  }

  changeImage = (data) => {
    this.loadImage('data:image/png;base64,' + data);
  }

  loadImage = (url) => {
    const image = new window.Image();
    image.src = url;
    image.onload = () => {
      this.setState({image});
      this.props.onImageLoaded({
        width: image.width,
        height: image.height,
      });
    }
  }

  render() {
    return (
      <Image ref="spriteImage" image={this.state.image} />
    );
  }
}