import { Dispatch, SetStateAction } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import locationsData from '../../../../data/locationsData.json'

const MapComponent = ({
  viewState,
  setViewState,
}: {
  viewState: {
    longitude: number
    latitude: number
    zoom: number
  }
  setViewState: Dispatch<
    SetStateAction<{
      longitude: number
      latitude: number
      zoom: number
    }>
  >
}) => {
  return (
    <Map
      initialViewState={viewState}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      scrollZoom={false}
      style={{ width: 'inherit', height: 'inherit' }}
      mapStyle={'mapbox://styles/wael1964/cl2meqb7400ad14ks9xvuqff8'}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
    >
      {locationsData.map((location, index) => (
        <Marker
          key={index}
          longitude={Number(location.longitude)}
          latitude={Number(location.latitude)}
        ></Marker>
      ))}
      <NavigationControl showCompass={false} />
    </Map>
  )
}
export default MapComponent
