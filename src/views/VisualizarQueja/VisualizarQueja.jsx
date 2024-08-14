/* eslint-disable camelcase */
import { useParams } from 'react-router-dom'
import { useGet } from '../../assets/hooks/useData'
import { url_getQueja, url_quejasTareas } from '../../assets/api/admin.routes'
import './VisualizarQueja.css'
import { Tabla } from '../../components/Tabla/Tabla'
import { useState } from 'react'
import { ModalTareas } from '../../components/ModalTareas/ModalTareas'
import { useDataUser } from '../../assets/context/dataUser'

export function VisualizarQueja () {
  const { id } = useParams()
  const { response } = useGet(url_getQueja(id))
  const { response: tareas } = useGet(url_quejasTareas(id))
  const [modalTareas, setModalTareas] = useState(false)
  const { response: user } = useDataUser()

  // Copiar tareas y eliminar la propiedad img
  const tareaCopy = tareas
    ? tareas.map(tarea => {
      const { img, ...rest } = tarea
      return rest
    })
    : []

  // Determinar la imagen a mostrar
  const img = response?.status === 'Pendiente' ? response?.img_queja : (tareas.length > 0 && tareas[0]?.img)
  console.log(tareas)
  return (
    <>
      <h1>Información de la queja</h1>
      <hr />
      <article>
        <div>
          <h2>{response?.title}</h2>
          <p>{response?.description}</p>
          <p><strong>Estado:</strong> {response?.status}</p>
          <p><strong>Fecha de creación: </strong> {response?.createdAt?.split('T')[0]}</p>
          <p><strong>Fecha de actualización: </strong> {response?.updatedAt?.split('T')[0]}</p>
        </div>
        {img && <img src={img} alt='Imagen de queja' />}
      </article>
      {user?.rol === 'Admin' && (
        <button
          type='button'
          onClick={() => setModalTareas(true)}
        >
          Agregar tarea
        </button>)}
      {tareaCopy.length > 0 && (
        <Tabla
          headers={['Título', 'Descripción', 'Fecha de creación', 'Estado', 'Responsable']}
          data={tareaCopy}
        />
      )}
      {modalTareas && <ModalTareas setModalTareas={setModalTareas} idQueja={id} />}
    </>
  )
}
