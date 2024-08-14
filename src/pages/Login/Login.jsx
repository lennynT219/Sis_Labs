/* eslint-disable camelcase */
import { icons } from '../../assets/icon/icons'
import { FondoMov } from '../../components'
import { Icon } from '@iconify/react'
import './Login.css'
import { usePost } from '../../assets/hooks/useData'
import { url_login, url_registro } from '../../assets/api/user.routes'
import { useEffect, useState } from 'react'
import { useMessage } from '../../assets/hooks/useMessage'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const facultades = [
  'Facultad de Ciencias',
  'Facultad de Ciencias Administrativas',
  'Facultad de Ingeniería Civil y Ambiental',
  'Facultad de Ingeniería Eléctrica y Electrónica',
  'Facultad de  Geología y Petróleos',
  'Facultad de Ingeniería  Mecánica',
  'Facultad de Ingeniería Química y Agroindustria',
  'Facultad de Ingeniería en Sistemas',
  'Escuela de formación de Tecnólogos (ESFOT)',
  'Departamento de formación básica'
]

export function Login () {
  const [hide, setHide] = useState(false)
  const [valores, setValores] = useState({})
  const [activarPeticion, setActivarPeticion] = useState(false)
  const url = hide ? url_registro : url_login
  const { response, error } = usePost(url, valores, activarPeticion, setActivarPeticion)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [])

  const toggle = () => {
    setHide(!hide)
    setValores({})
  }

  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    })
  }

  useMessage(error)

  useEffect(() => {
    if (response) {
      toast.success(response?.msg)
      if (!hide) {
        localStorage.setItem('token', response?.token)
        navigate('/')
      } else {
        toggle()
      }
    }
  }, [response])

  const handleSubmit = (e) => {
    e.preventDefault()
    setActivarPeticion(true)
  }

  console.log(valores)

  return (
    <>
      <FondoMov />
      <main className='login'>
        <div className={`${hide ? 'hide' : ''}`}>
          <section>
            <h2>Bienvenido a LabSupport</h2>
            <p>Se parte de la comunidad de LabSupport, ingresa tus datos para registrarte</p>
            <input type='button' value='Registrarse' onClick={toggle} />
          </section>
          <section>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <Icon icon={icons.IEmail} />
                <input
                  type='text'
                  placeholder='Nombre de Usuario'
                  name='username'
                  onChange={handleChange}
                />
              </label>
              <label>
                <Icon icon={icons.IPassword} />
                <input
                  type='password'
                  placeholder='Contraseña'
                  name='password'
                  onChange={handleChange}
                />
              </label>
              <input type='submit' value='Iniciar Sesión' />
            </form>
          </section>
        </div>
        <div className={`${!hide ? 'hide' : ''}`}>
          <section>
            <h2>Te damos la bienvenida a LabSupport</h2>
            <p>Inicia sesión para acceder a tu cuenta</p>
            <input type='button' value='Iniciar Sesión' onClick={toggle} />
          </section>
          <section>
            <h2>Crear una cuenta</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <Icon icon={icons.IFacultad} />
                <select defaultValue='' onChange={handleChange} name='facultad'>
                  <option value='' disabled>Facultad</option>
                  {facultades.map(facultad => (
                    <option key={facultad} value={facultad}>{facultad}</option>
                  ))}
                </select>
              </label>
              <label>
                <Icon icon={icons.IRol} />
                <select defaultValue='' onChange={handleChange} name='rol'>
                  <option value='' disabled>Rol</option>
                  <option value='Estudiante'>Estudiante</option>
                  <option value='Docente'>Docente</option>
                </select>
              </label>
              <label>
                <Icon icon={icons.ICedula} />
                <input
                  type='text'
                  placeholder='Cédula'
                  name='cedula'
                  onChange={handleChange}
                />
              </label>
              <label>
                <Icon icon={icons.IUsuario} />
                <input
                  type='text'
                  placeholder='Nombres'
                  name='nombres'
                  onChange={handleChange}
                />
              </label>
              <label>
                <Icon icon={icons.IUsuario} />
                <input
                  type='text'
                  placeholder='Apellidos'
                  name='apellidos'
                  onChange={handleChange}
                />
              </label>
              <label>
                <Icon icon={icons.IGenero} />
                <select defaultValue='' onChange={handleChange} name='genero'>
                  <option value='' disabled>Genero</option>
                  <option value='M'>Masculino</option>
                  <option value='F'>Femenino</option>
                  <option value='O'>Otro</option>
                </select>
              </label>
              <label>
                <Icon icon={icons.IUsuario} />
                <input
                  type='text'
                  placeholder='Nombre de Usuario'
                  name='username'
                  onChange={handleChange}
                />
              </label>
              <label>
                <Icon icon={icons.IEmail} />
                <input
                  type='email'
                  placeholder='Correo Electrónico'
                  name='email'
                  onChange={handleChange}
                />
              </label>
              <label>
                <Icon icon={icons.IPassword} />
                <input
                  type='password'
                  placeholder='Contraseña'
                  name='password'
                  onChange={handleChange}
                />
              </label>
              <input type='submit' value='Registrarse' />
            </form>
          </section>
        </div>
      </main>
    </>

  )
}
