import './FondoTri.css'

function Triangulo ({ index, total }) {
  const size = Math.random() * 50 + 'px'
  const rotate = Math.random() * 360 + 'deg'
  const x = Math.random() * 1000 + 'px'
  const y = Math.random() * 1000 + 'px'
  const color = `hsla(${Math.random() * 360}, 100%, 50%,1)`
  const delay = `-${index * (10 / total)}s`
  const style = {
    borderTop: `${size} solid ${color}`,
    borderRight: `${size} solid transparent`,
    borderLeft: `${size} solid transparent`,
    marginLeft: `calc(${size} / -2)`,
    marginTop: `calc(${size} / -2)`,
    transform: `rotate(${rotate}) translate3d(0, 0, -1000px) scale(0)`,
    animationDelay: delay,
    '--rotate': rotate,
    '--x': x,
    '--y': y,
    '--rotates': `${rotate * 1.5}deg`
  }
  return <div className='tri' style={style} />
}

export function FondoTri () {
  const triangulos = Array.from({ length: 200 })

  return (
    <div className='fondo-tri'>
      <div className='wrap'>
        {triangulos.map((_, i) => (
          <Triangulo key={i} index={i} total={200} />
        ))}
      </div>
    </div>
  )
}
