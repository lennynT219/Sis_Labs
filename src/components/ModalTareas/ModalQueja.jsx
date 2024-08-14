import { Icon } from '@iconify/react'
import { icons } from '../../assets/icon/icons'
import './ModalTareas.css'
import { useState } from 'react'
import { url_createQuejas } from '../../assets/api/user.routes'
import { useMessage } from '../../assets/hooks/useMessage'
import axios from 'axios'
import { toast } from 'sonner'

export function ModalQuejas ({ setModal }) {
  const [valores, setValores] = useState()
  const [img, setImg] = useState()
  const handleImageChange = (e) => {
    setImg(e.target.files[0]) // Guardar el archivo de imagen en el estado
  }
  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = async () => {
    const formData = new FormData()
    formData.append('title', valores.title)
    formData.append('description', valores.description)
    formData.append('img', img)

    try {
      const response = await axios.post(url_createQuejas, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast.success('Queja creada')
    } catch (error) {
      console.log(error)
      toast.error('Error al crear queja')
    }
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Agregar queja</h2>
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
            <Icon icon={icons.IPassword} />
            <input
              type='file'
              onChange={handleImageChange}
              accept='image/*'
            />
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
            onClick={() => setModal(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
