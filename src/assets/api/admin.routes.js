/* eslint-disable camelcase */
const BASE_URL = import.meta.env.VITE_API_URL

const url_getAllQuejas = `${BASE_URL}admin/quejas`
const url_getQueja = id => `${BASE_URL}admin/quejas/${id}`
const url_quejasTareas = id => `${BASE_URL}admin/quejas-tareas/${id}`
const url_getPasantes = `${BASE_URL}admin/pasantes`
const url_createTareas = `${BASE_URL}admin/tareas`

export {
  url_getAllQuejas,
  url_getQueja,
  url_quejasTareas,
  url_getPasantes,
  url_createTareas
}
