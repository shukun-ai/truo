import { EdgeMarker, MarkerType } from 'reactflow';

export function getDefaultPosition() {
  return { x: 0, y: 0 };
}

export function createEdgeMarker() {
  const edgeMarker: EdgeMarker = {
    type: MarkerType.ArrowClosed,
    width: 18,
    height: 18,
  };
  return edgeMarker;
}
