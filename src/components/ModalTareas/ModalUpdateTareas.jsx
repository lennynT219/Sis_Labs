import { Icon } from '@iconify/react'
import { icons } from '../../assets/icon/icons'
import './ModalTareas.css'
import { useEffect, useState } from 'react'
import { useGet, usePost } from '../../assets/hooks/useData'
import { url_getPasantes, url_createTareas } from '../../assets/api/admin.routes'
import { useMessage } from '../../assets/hooks/useMessage'
import axios from 'axios'
import { url_getTarea } from '../../assets/api/pasante.routes'
import { toast } from 'sonner'

export function ModalUpdateTareas ({ setModalTareas, idQueja, row }) {
  const [valores, setValores] = useState({})
  const [img, setImg] = useState()

  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    setImg(e.target.files[0]) // Guardar el archivo de imagen en el estado
  }

  const handleClick = async () => {
    const formData = new FormData()
    formData.append('status', valores.status)
    formData.append('img', img)

    try {
      const response = await axios.put(url_getTarea(row.id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast.success('Tarea actualizada')
    } catch (error) {
      console.log(error)
      toast.error('Error al crear queja')
    }
  }
  console.log(valores)
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
              value={row.titulo}
              disabled
            />
          </label>
          <label>
            <Icon icon={icons.IPassword} />
            <input
              type='text'
              placeholder='Descripcion'
              name='description'
              value={row.descripcion}
              disabled
            />
          </label>
          <label>
            <Icon icon={icons.IRol} />
            <select defaultValue={row.estado} onChange={handleChange} name='status'>
              <option value='Pediente'>Pediente</option>
              <option value='Completada'>Completada</option>
            </select>
          </label>
          <label>
            <Icon icons={icons.IRol} />
            <input type='file' onChange={handleImageChange} accept='image/*' />
          </label>
        </form>
        <div>
          <button
            type='button'
            onClick={handleClick}
          >
            Actualizar
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
