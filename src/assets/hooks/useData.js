import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { UpdateData } from '../context/UpdateData'

const useGet = (url, query) => {
  const { updateDataTrigger } = useContext(UpdateData)
  const [response, setResponse] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          params: query
        })
        setResponse(res.data)
        setError(null)
      } catch (err) {
        setError(err)
        setResponse([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url, updateDataTrigger, query])
  const { values, modelo } = response
  return { response, values, modelo, isLoading, error }
}

const usePost = (url, data, activarPeticion, setActivarPeticion) => {
  const { setUpdateDataTrigger } = useContext(UpdateData)
  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!activarPeticion) return
      setIsLoading(true)
      try {
        const res = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setResponse(res.data)
        console.log(res.data)
        setUpdateDataTrigger(prev => !prev)
      } catch (err) {
        console.log('Error al enviar la información:', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    setActivarPeticion(false)
  }, [activarPeticion])
  return { response, isLoading, error }
}

const usePut = async (url, data, activarPeticion, setActivarPeticion) => {
  const { setUpdateDataTrigger } = useContext(UpdateData)
  const [response, setResponse] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      if (!activarPeticion) return
      setIsLoading(true)
      try {
        const res = await axios.put(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setResponse(res.data)
        setUpdateDataTrigger(prev => !prev)
      } catch (err) {
        console.log('Error al enviar la información:', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    setActivarPeticion(false)
  }, [activarPeticion])
  return { response, isLoading, error }
}

const useDelete = async (url, activarPeticion, setActivarPeticion) => {
  const { setUpdateDataTrigger } = useContext(UpdateData)
  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      if (!activarPeticion) return
      setIsLoading(true)
      try {
        const res = await axios.delete(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setResponse(res.data)
        setUpdateDataTrigger(prev => !prev)
      } catch (err) {
        console.log('Error al enviar la información:', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    setActivarPeticion(false)
  }, [activarPeticion])
  return { response, isLoading, error }
}

export {
  useGet,
  usePost,
  usePut,
  useDelete
}
