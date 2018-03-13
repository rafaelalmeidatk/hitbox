import React from 'react';
import { Group, Image } from 'react-konva';

export default class SpriteImage extends React.Component {
  state = {
    image: null
  }

  changeImage(data) {
    const image = new window.Image();
    image.src = 'data:image/png;base64,' + data;
    image.onload = () => {
      this.setState({image});
    }
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://localhost:3000/player.png';
    image.onload = () => {
      this.setState({ image });
    }
  }

  render() {
    return (
      <Image ref="spriteImage" image={this.state.image} />
    );
  }
}