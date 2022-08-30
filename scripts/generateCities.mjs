import fs from 'fs'
import { State } from 'country-state-city'
import locationsData from '../data/locationsData.json' assert { type: 'json' }

const inputStates = State.getStatesOfCountry('US')
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

let statesData = {}

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

fs.writeFile('./data/inputStates.json', JSON.stringify(inputStates), (err) => {
  if (err) {
    console.error(err)
    return
  }
})

fs.writeFile('./data/statesData.json', JSON.stringify(statesData), (err) => {
  if (err) {
    console.error(err)
    return
  }
  process.exit()
})
