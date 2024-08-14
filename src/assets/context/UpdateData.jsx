import { createContext, useState } from 'react'

export const UpdateData = createContext()

export const UpdateDataProvaider = ({ children }) => {
  const [updateDataTrigger, setUpdateDataTrigger] = useState(false)
  return (
    <UpdateData.Provider value={{ updateDataTrigger, setUpdateDataTrigger }}>
      {children}
    </UpdateData.Provider>
  )
}
