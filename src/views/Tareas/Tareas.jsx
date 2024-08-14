import { useState } from 'react'
import { url_getAllTareas } from '../../assets/api/pasante.routes'
import { useDataUser } from '../../assets/context/dataUser'
import { useGet } from '../../assets/hooks/useData'
import { Tabla } from '../../components/Tabla/Tabla'
import './Tareas.css'

export function Tareas () {
  const headers = ['Titulo', 'Descripción', 'Fecha', 'Estado', 'Acciones']
  const { response: user } = useDataUser()
  const { response: tareas } = useGet(url_getAllTareas)
  const [modal, setModal] = useState(false)
  return (
    <>
      <h1>Getión de tareas</h1>
      <hr />
      {tareas.length > 0
        ? <Tabla
            headers={headers}
            data={tareas}
            tabla='tareas'
            rol={user?.rol}
            handleUpdate={() => setModal(!modal)}
            modal={modal}
          />
        : <h2>No hay tareas pendientes</h2>}
    </>
  )
}
