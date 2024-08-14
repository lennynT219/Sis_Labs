import { useState } from 'react'
import './Perfil.css'
import axios from 'axios'
import { url_updatePerfil } from '../../assets/api/user.routes'
import { useDataUser } from '../../assets/context/dataUser'

export function Perfil () {
  const { response } = useDataUser()
  const [valores, setValores] = useState({
    cedula: response?.cedula,
    nombres: response?.nombres,
    apellidos: response?.apellidos,
    username: response?.username,
    email: response?.email,
    genero: response?.genero
  })
  const [img, setImg] = useState(response?.img_perfil || 'No img')

  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    setImg(e.target.files[0]) // Guardar el archivo de imagen en el estado
  }

  const handleSubmitPerfil = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('cedula', valores?.cedula)
    formData.append('nombres', valores?.nombres)
    formData.append('apellidos', valores?.apellidos)
    formData.append('username', valores?.username)
    formData.append('email', valores?.email)
    formData.append('genero', valores?.genero)
    formData.append('img', img)

    try {
      const response = await axios.put(url_updatePerfil, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Configuracion del Perfil</h1>
      <hr />
      <div className='info-personal'>

        <form onSubmit={handleSubmitPerfil}>
          <h2>Informacion Personal</h2>
          <label>
            Cedula:
            <input
              type='text'
              placeholder='Cedula'
              name='cedula'
              value={valores.cedula}
              onChange={handleChange}
            />
          </label>
          <label>
            Nombres:
            <input
              type='text'
              placeholder='Nombres'
              name='nombres'
              value={valores.nombres}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellidos:
            <input
              type='text'
              placeholder='Apellidos'
              name='apellidos'
              value={valores.apellidos}
              onChange={handleChange}
            />
          </label>
          <label>
            Nombre de Usuario:
            <input
              type='text'
              placeholder='Nombre de Usuario'
              name='username'
              value={valores.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Genero:
            <select name='genero' onChange={handleChange} defaultValue={valores.genero}>
              <option value=''>Seleccione una opcion</option>
              <option value='M'>Masculino</option>
              <option value='F'>Femenino</option>
              <option value='O'>Otro</option>
            </select>
          </label>
          <label>
            Imagen de Perfil:
            <input
              type='file'
              onChange={handleImageChange}
              accept='image/*'
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type='email'
              placeholder='Correo Electrónico'
              name='email'
              value={valores.email}
              onChange={handleChange}
              disabled
            />
          </label>
          <button
            type='submit'
          >
            Actualizar
          </button>
        </form>
        <form>
          <h2>Actualizar contraseña</h2>
          <label>
            Contraseña Actual:
            <input
              type='password'
              placeholder='Contraseña Actual'
              name='password'
              value={valores.password}
              onChange={handleChange}
            />
          </label>
          <label>
            Nueva Contraseña:
            <input
              type='password'
              placeholder='Nueva Contraseña'
              name='newPassword'
              value={valores.newPassword}
              onChange={handleChange}
            />
          </label>
          <label>
            Confirmar Contraseña:
            <input
              type='password'
              placeholder='Confirmar Contraseña'
              name='confirmPassword'
              value={valores.confirmPassword}
              onChange={handleChange}
            />
          </label>
          <button
            type='submit'
          >Actualizar
          </button>
        </form>
      </div>
    </>
  )
}
