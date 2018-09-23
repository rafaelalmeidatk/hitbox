export function localPositionToCanvas(rect, origin, frameSourceRect) {
  return {
    x:
      frameSourceRect.x +
      rect.x +
      (frameSourceRect.width - rect.width) * origin.x,
    y:
      frameSourceRect.y +
      rect.y +
      (frameSourceRect.height - rect.height) * origin.y,
  };
}
