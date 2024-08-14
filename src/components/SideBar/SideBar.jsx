import { Icon } from '@iconify/react'
import './SideBar.css'
import { icons } from '../../assets/icon/icons'
import { useState } from 'react'
import { OpcionesUser } from '../OpcionesSidebar/OpcionUser'
import { OpcionesAdmin } from '../OpcionesSidebar/OpcionAdmin'
import { OpcionesPasante } from '../OpcionesSidebar/OpcionPasante'
import { Link, useNavigate } from 'react-router-dom'
import { useDataUser } from '../../assets/context/dataUser'

export function SideBar ({ home }) {
  const navigate = useNavigate()
  const { response } = useDataUser()
  const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const rol = response?.rol
  const imagen = response?.img_pefil ? response?.img_pefil : response?.genero === 'M' ? 'perfil_m.png' : 'perfil_f.png'
  return (
    <aside className='sidebar'>
      <div>
        <img src={imagen} alt='foto de perfil' />
        <p>{response?.nombres?.split(' ')[0]} {response?.apellidos?.split(' ')[0]}</p>
        <div class='botones'>
          <Icon icon={icons.ICasa} onClick={home} />
          <Link to='perfil'><Icon icon={icons.IPerfil} /> </Link>
          <Icon icon={icons.ICerrar} onClick={handleClick} />
        </div>
      </div>
      {(rol === 'Estudiante' || rol === 'Docente' || rol === 'Pasante') && <OpcionesUser />}
      {rol === 'Admin' && <OpcionesAdmin />}
      {rol === 'Pasante' && <OpcionesPasante />}
    </aside>
  )
}
