/* eslint-disable camelcase */
import { useParams } from 'react-router-dom'
import { useGet } from '../../assets/hooks/useData'
import { url_getQueja, url_quejasTareas } from '../../assets/api/admin.routes'
import './VisualizarQueja.css'
import { Tabla } from '../../components/Tabla/Tabla'
import { useState } from 'react'
import { ModalTareas } from '../../components/ModalTareas/ModalTareas'
import { useDataUser } from '../../assets/context/dataUser'
import { url_getTarea } from '../../assets/api/pasante.routes'

export function VisualizarTarea () {
  const { id } = useParams()
  const { response } = useGet(url_getTarea(id))
  const { response: tareas } = useGet(url_quejasTareas(id))
  const [modalTareas, setModalTareas] = useState(false)
  const { response: user } = useDataUser()

  return (
    <>
      <h1>Informacion de la tarea asignada</h1>
      <hr />
      <article>
        <div>
          <h2>{response?.title}</h2>
          <p>{response?.description}</p>
          <p><strong>Estado:</strong> {response?.status}</p>
          <p><strong>Fecha de creacion: </strong> {response?.createdAt?.split('T')[0]}</p>
          <p><strong>Fecha de actualizacion: </strong> {response?.updatedAt?.split('T')[0]}</p>
          <p><strong>Descripcion de la queja: </strong> {response?.queja_id?.description}</p>
        </div>
        <img src={response?.queja_id?.img_queja} alt='Imagen de la tarea completa' />
      </article>
      {user?.rol === 'Admin' && (
        <button
          type='button'
          onClick={() => setModalTareas(true)}
        >
          Agregar tarea
        </button>)}
      {tareas.length > 0 && (
        <Tabla
          headers={['Titulo', 'Descripcion', 'Fecha de creacion', 'Estado', 'Responsable', 'Acciones']}
          data={tareas}
          tabla='tareas'
        />
      )}
      {modalTareas && <ModalTareas setModalTareas={setModalTareas} idQueja={id} />}
    </>
  )
}
