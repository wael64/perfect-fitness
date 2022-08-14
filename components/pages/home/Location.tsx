import { useRef, useState } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { State } from 'country-state-city'
import locationsData from '../../../data/locationsData.json'

import { Select } from '@mantine/core'

import SvgSearch from '../../../public/static/icons/SvgSearch'
import SvgDown from '../../../public/static/icons/SvgDown'

const Locations = () => {
  const inputStates = useRef(
    State.getStatesOfCountry('US')
      .filter((item) => {
        if (
          locationsData.some((location) => {
            return location.name === item.name
          })
        ) {
          return true
        } else {
          return false
        }
      })
      .map((item) => {
        return item.name
      })
  )
  let statesData: { [name: string]: { lat: number; long: number } } = {}

  State.getStatesOfCountry('US').forEach((item) => {
    if (
      locationsData.some((location) => {
        return location.name === item.name
      })
    ) {
      statesData[item.name] = {
        lat: Number(item.latitude),
        long: Number(item.longitude),
      }
    }
  })

  const [state, setState] = useState<string | null>(null)
  const [viewState, setViewState] = useState({
    longitude: -98.31277959569445,
    latitude: 40.54809506049773,
    zoom: 3.5,
  })

  const selectHandler = (state: string) => {
    setState(state)
    setViewState({
      longitude: statesData[state].long,
      latitude: statesData[state].lat,
      zoom: 8,
    })
  }

  return (
    <section className='mt-12 px-4  lg:px-0 sm:mx-auto w-full    sm:max-w-none md:max-w-[1120px] xl:max-w-[1400px]'>
      <h1 className='font-semibold text-center text-2xl xs:text-4xl sm:text-5xl lg:text-6xl'>
        FIND A LOCATION NEAR YOU
      </h1>
      <Select
        placeholder='Choose or search for your state'
        data={inputStates.current}
        value={state}
        onChange={selectHandler}
        rightSection={<SvgSearch className='h-6 w-6 cursor-pointer' />}
        icon={<SvgDown className='h-5 w-5 cursor-pointer' />}
        searchable
        classNames={{
          root: 'relative xs:w-[380px] md:w-[400px] mx-auto mb-6 mt-8 sm:mb-8 sm:mt-10 lg:mb-10 lg:mt-12',
          input:
            'bg-white text-secondary-dark font-medium h-auto py-1 text-base border-[1px] border-white focus:border-white rounded-none focus:border-[1px] active:border-[1px] placeholder:text-neutral-500 px-12',
          dropdown: 'bg-neutral-100 border-0 rounded-none',
          item: 'text-neutral-800 mb-1 rounded-none',
          hovered: 'bg-primary',
          selected: 'bg-primary',
        }}
      />

      <div className='w-full h-[20rem] sm:h-[30rem] md:h-[40rem]'>
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
      </div>
    </section>
  )
}
export default Locations
