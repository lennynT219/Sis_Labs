import { useState, useEffect } from 'react'
import './FondoMov.css'

export function FondoMov () {
  const imgs = [
    '/img-login-1.png',
    '/img-login-2.png',
    '/img-login-3.png'
  ]
  const [img, setImg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setImg(img => (img + 1) % imgs.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [img.length])

  return (
    <div
      className='fondo-mov'
      style={{
        backgroundImage: `url(${imgs[img]})`
      }}
    />
  )
}
