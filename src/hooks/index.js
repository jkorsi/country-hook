import {useState, useEffect} from 'react'
import axios from 'axios'

export const useField = (type) =>
{

  const [value, setValue] = useState('')

  const onChange = (event) =>
  {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) =>
{
  const [country, setCountryData] = useState(null)

  const apiLink = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

  //HOOK AND EFFECT-----------------------------
  const hook = () =>
  {
    if (name) { 
    axios
      .get(apiLink)
      .then(response =>
      {
        const responseData = response.data[0]
        const found = response.status === 200 ? true : false
        const countryToSet = {
          ...responseData,
          found: found
        }
        setCountryData(countryToSet)
      })
    }
  }
  useEffect(hook, [name, apiLink])
  //---------------------------------------------

  return country
}
