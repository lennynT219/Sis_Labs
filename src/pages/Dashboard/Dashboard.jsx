import { Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { Pasante, Perfil, Quejas, Tareas, VisualizarQueja, VisualizarTarea } from '../../views'
import './Dashboard.css'

export function Dashboard ({ handleScroll }) {
  return (
    <section id='dashboard'>
      <DashboardLayout home={handleScroll}>
        <Routes>
          <Route path='quejas' element={<Quejas />} />
          <Route path='tareas' element={<Tareas />} />
          <Route path='pasante' element={<Pasante />} />
          <Route path='perfil' element={<Perfil />} />
          <Route path='visualizar-queja/:id' element={<VisualizarQueja />} />
          <Route path='visualizar-tarea/:id' element={<VisualizarTarea />} />
        </Routes>
      </DashboardLayout>
    </section>
  )
}
