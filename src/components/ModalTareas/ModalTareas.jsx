import { Icon } from '@iconify/react'
import { icons } from '../../assets/icon/icons'
import './ModalTareas.css'
import { useEffect, useState } from 'react'
import { useGet, usePost } from '../../assets/hooks/useData'
import { url_getPasantes, url_createTareas } from '../../assets/api/admin.routes'
import { useMessage } from '../../assets/hooks/useMessage'

export function ModalTareas ({ setModalTareas, idQueja }) {
  const [valores, setValores] = useState({ queja_id: idQueja })
  const { response } = useGet(url_getPasantes)
  const [activarPeticion, setActivarPeticion] = useState(false)
  const { response: msg, error } = usePost(url_createTareas, valores, activarPeticion, setActivarPeticion)

  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    })
  }

  useMessage(error)

  useEffect(() => {}, [msg])

  const handleClick = () => {
    setActivarPeticion(true)
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Agregar tarea</h2>
        <form>
          <label>
            <Icon icon={icons.IEmail} />
            <input
              type='text'
              placeholder='Titulo'
              name='title'
              onChange={handleChange}
            />
          </label>
          <label>
            <Icon icon={icons.IPassword} />
            <input
              type='text'
              placeholder='Descripcion'
              name='description'
              onChange={handleChange}
            />
          </label>
          <label>
            <Icon icon={icons.IRol} />
            <select defaultValue='' onChange={handleChange} name='asignada_a'>
              <option value='' disabled>Pasante</option>
              {response.map(pasante => (
                <option key={pasante._id} value={pasante._id}>{`${pasante.nombres} ${pasante.apellidos}`}</option>
              ))}
            </select>
          </label>
        </form>
        <div>
          <button
            type='button'
            onClick={handleClick}
          >
            Agregar
          </button>
          <button
            type='button'
            onClick={() => setModalTareas(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
