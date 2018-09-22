export function localPositionToCanvas(position, frameSourceRect) {
  return {
    x: frameSourceRect.x + position.x,
    y: frameSourceRect.y + position.y,
  };
}

export function canvasToLocalPosition(position, frameSourceRect) {
  return {
    x: Math.floor(position.x) - frameSourceRect.x,
    y: Math.floor(position.y) - frameSourceRect.y,
  }
}