/* eslint-disable camelcase */
const BASE_URL = import.meta.env.VITE_API_URL

const url_getAllTareas = `${BASE_URL}pasante/tareas`
const url_getTarea = id => `${BASE_URL}pasante/tareas/${id}`

export {
  url_getAllTareas,
  url_getTarea
}
