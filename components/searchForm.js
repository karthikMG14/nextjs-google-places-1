import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import {getMapLocation} from "../redux/maps/mapSlice";
const scriptOptions = {
  googleMapsApiKey: "AIzaSyCn7YgQgOtNoSwAXJ_OQ-urMB5oNVq73cM",
  libraries: ['places'],
}



export default function SearchForm({ action }) {
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript(scriptOptions)
  const [autocomplete, setAutocomplete] = useState(null)
  const inputEl = useRef(null)

  let locationData = useSelector((state) => state.mapsData)
  let dispatch =  useDispatch()

  console.log(locationData.data)

  const onKeypress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onLoad = (autocompleteObj) => {
    setAutocomplete(autocompleteObj)
  }

  const onPlaceChanged = (e) => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if ('place_id' in place) {
        dispatch(getMapLocation({place:place}))
      }
    }
  }

  React.useEffect(() => {
  },[dispatch,locationData.data])

  return (
    <div className="bg-white shadow p-10 rounded">
      { loadError && (
        <div>Google Map script can't be loaded, please reload the page</div>
      ) }

      { isLoaded && (
        <React.Fragment>
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">Search Place</h1>
          <form className="flex" onSubmit={handleSubmit}>
            <div className="w-full">
              <Autocomplete
                onLoad={onLoad}
                fields={['place_id']}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  ref={inputEl}
                  type="text"
                  className="form-input block py-3 w-full rounded-md"
                  placeholder="Type keywords..."
                  onKeyPress={onKeypress}
                />
              </Autocomplete>
            </div>
          </form>
        </React.Fragment>
      ) }

      <div style={{marginTop:'1em'}}>
            <iframe src={`https://maps.google.com/maps?q=${locationData.data.lat},${locationData.data.lng}&output=embed`} width={'100%'} height={450} style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}
