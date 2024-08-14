import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { icons } from '../../assets/icon/icons'
import './Tabla.css'
import { ModalUpdateTareas } from '../ModalTareas/ModalUpdateTareas'

export function Tabla ({ headers, data, tabla, rol, handleUpdate, modal }) {
  return (
    <div className='tabla'>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const rowCopy = { ...row }
            delete rowCopy.id
            return (
              <tr key={i}>
                {Object.values(rowCopy).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
                {tabla === 'quejas' && (
                  <td>
                    <Link to={`/visualizar-queja/${row.id}`}>
                      <Icon icon={icons.IInfo} />
                    </Link>
                  </td>
                )}
                {tabla === 'tareas' && (
                  <td>
                    <Link to={`/visualizar-tarea/${row.id}`}>
                      <Icon icon={icons.IInfo} />
                    </Link>
                    {rol === 'Pasante' && <Icon icon={icons.IActualizar} onClick={handleUpdate} />}
                  </td>
                )}
                {modal && <ModalUpdateTareas setModalTareas={handleUpdate} row={row} />}
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}
