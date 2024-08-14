import { Icon } from '@iconify/react'
import { icons } from '../../assets/icon/icons'
import { Link } from 'react-router-dom'

export function OpcionesUser () {
  return (
    <ul>
      <li>
        <Link to='quejas'>
          <Icon icon={icons.IQueja} />
          <p>Gestión de quejas</p>
        </Link>
      </li>
    </ul>
  )
}
