import mapboxgl from './mapboxgl';

import type {PaddingOptions, ViewState} from './types';

/**
 * Stub for mapbox's Transform class
 * https://github.com/mapbox/mapbox-gl-js/blob/main/src/geo/transform.js
 */
export type Transform = {
  center: {lng: number; lat: number};
  zoom: number;
  bearing: number;
  pitch: number;
  padding: PaddingOptions;

  clone: () => Transform;
  resize: (width: number, height: number) => void;
  isPaddingEqual: (value: PaddingOptions) => boolean;
};

/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
export function transformToViewState(tr: Transform): ViewState {
  return {
    longitude: tr.center.lng,
    latitude: tr.center.lat,
    zoom: tr.zoom,
    pitch: tr.pitch,
    bearing: tr.bearing,
    padding: tr.padding
  };
}

/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
export function applyViewStateToTransform(
  tr: Transform,
  vs: ViewState | {viewState: ViewState}
): boolean {
  // @ts-ignore
  const v: ViewState = vs.viewState || vs;
  let changed = false;

  if ('longitude' in v && 'latitude' in v) {
    const center = tr.center;
    tr.center = new mapboxgl.LngLat(v.longitude, v.latitude);
    changed = changed || center !== tr.center;
  }
  if ('zoom' in v) {
    const zoom = tr.zoom;
    tr.zoom = v.zoom;
    changed = changed || zoom !== tr.zoom;
  }
  if ('bearing' in v) {
    const bearing = tr.bearing;
    tr.bearing = v.bearing;
    changed = changed || bearing !== tr.bearing;
  }
  if ('pitch' in v) {
    const pitch = tr.pitch;
    tr.pitch = v.pitch;
    changed = changed || pitch !== tr.pitch;
  }
  if (v.padding && !tr.isPaddingEqual(v.padding)) {
    changed = true;
    tr.padding = v.padding;
  }
  return changed;
}