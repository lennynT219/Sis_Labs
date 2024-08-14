import React, { useEffect, useState } from 'react'
import { Dashboard } from '../Dashboard/Dashboard'
import './LandingPage.css'
import { FondoTri } from '../../components'
import { useDataUser } from '../../assets/context/dataUser'
import { useNavigate } from 'react-router-dom'
import { ModalQuejas } from '../../components/ModalTareas/ModalQueja'

export function LandingPage () {
  const [activeScroll, setActiveScroll] = useState(false)
  const [modal, setModal] = useState(false)
  const { response } = useDataUser()
  const navigate = useNavigate()
  const handleScroll = () => {
    setActiveScroll(!activeScroll)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const handleScroll = (e) => {
        if (e.deltaY > 0) {
          setActiveScroll(true)
          console.log('scrolling down')
        }
      }

      window.addEventListener('wheel', handleScroll)

      return () => {
        window.removeEventListener('wheel', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const section = activeScroll ? 'dashboard' : 'landing'
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' })
  }, [activeScroll])

  const handleClick = () => {
    if (response?.rol === 'Admin') {
      setActiveScroll(true)
      navigate('quejas')
    } else {
      setModal(true)
    }
  }
  return (
    <main className='landing-page'>
      <section id='landing'>
        <FondoTri />
        <img src='logo-esfot.png' alt='logo-esfot' />
        <img src='logo-epn.png' alt='logo-epn' />
        <img className='row' src='IFlechaA.png' alt='flecha hacia abajo' />
        {response?.rol === 'Admin'
          ? <button type='button' onClick={handleClick}>Ver quejas</button>
          : <button type='button' onClick={handleClick}>Crear nueva queja</button>}
        <h3>Ir a tu dashboard</h3>
      </section>
      <Dashboard handleScroll={handleScroll} />
      {modal && <ModalQuejas setModal={setModal} />}
    </main>
  )
}
