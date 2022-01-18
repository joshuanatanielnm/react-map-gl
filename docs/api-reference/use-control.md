# useControl

The `useControl` hook is used to create React wrappers for custom map controls.

```js
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Map, {useControl} from 'react-map-gl';

function DrawControl(props: DrawControlProps) {
  useControl(() => new MapboxDraw(props), {
    position: props.position
  });

  return null;
}

function App() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
    >
      <DrawControl
        position="top-left"
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true
        }}
      />
    </Map>
  );
}
```

See a full example [here](/examples/draw-polygon).

## Signature

```js
useControl(onCreate: () => IControl, options?: {
  position?: ControlPosition;
  onAdd?: (map: MapboxMap) => void;
  onRemove?: (map: MapboxMap) => void;
}): IControl
```

The hook creates an [IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol) instance, adds it to the map when it's available, and removes it upon unmount.

Parameters:

- `onCreate`: () => [IControl](/docs/api-reference/types.md#icontrol) - called to create an instance of the control.
- `options`: object
  + `position`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' - control position relative to the map
  + `onAdd`: (map: [MapboxMap](/docs/api-reference/types.md#mapboxmap)) => void - called after the control is added to a map
  + `onRemove`: (map: [MapboxMap](/docs/api-reference/types.md#mapboxmap)) => void - called before the control is removed from a map

Returns:

[IControl](/docs/api-reference/types.md#icontrol) - the control instance from `onCreate`.


## Source

[use-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-dev/src/components/use-control.ts)