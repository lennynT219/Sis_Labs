import { Icon } from '@iconify/react'
import { icons } from '../../assets/icon/icons'
import { Link } from 'react-router-dom'

export function OpcionesPasante () {
  return (
    <ul>
      <li>
        <Link to='tareas'>
          <Icon icon={icons.ITarea} />
          <p>Getión de tareas</p>
        </Link>
      </li>
    </ul>
  )
}
