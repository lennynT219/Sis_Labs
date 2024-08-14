/* eslint-disable camelcase */
import { createContext, useContext, useEffect } from 'react'
import { useGet } from '../hooks/useData'
import { url_updatePerfil } from '../api/user.routes'

const DataUser = createContext()

export function DataUserProvider ({ children }) {
  const { response, error } = useGet(url_updatePerfil)
  useEffect(() => {
    if (error?.response.data?.message === 'Token no válido') {
      localStorage.removeItem('token')
    }
  }, [error])

  return (
    <DataUser.Provider value={{ response }}>
      {children}
    </DataUser.Provider>
  )
}

export function useDataUser () {
  return useContext(DataUser)
}
