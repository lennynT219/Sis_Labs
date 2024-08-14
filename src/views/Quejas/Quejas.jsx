/* eslint-disable camelcase */
import { useState } from 'react'
import { url_getAllQuejas } from '../../assets/api/admin.routes'
import { url_createQuejas } from '../../assets/api/user.routes'
import { useDataUser } from '../../assets/context/dataUser'
import { useGet } from '../../assets/hooks/useData'
import { Tabla } from '../../components/Tabla/Tabla'
import './Quejas.css'
import { ModalQuejas } from '../../components/ModalTareas/ModalQueja'

const headers = ['Titulo', 'Descripción', 'Fecha', 'Estado', 'Acciones']

export function Quejas () {
  const [modal, setModal] = useState(false)
  const { response: user } = useDataUser()
  const url = user?.rol === 'Admin' ? url_getAllQuejas : url_createQuejas
  const { response } = useGet(url)

  return (
    <>
      <h1>Gestión de Quejas</h1>
      <hr />
      {user?.rol !== 'Admin' && <button onClick={() => { setModal(true) }}>Crear Queja</button>}
      {response.length > 0
        ? <Tabla headers={headers} data={response} tabla='quejas' rol={user?.rol} />
        : <h2>No ay quejas pendientes</h2>}
      {modal && <ModalQuejas setModal={setModal} />}
    </>
  )
}
