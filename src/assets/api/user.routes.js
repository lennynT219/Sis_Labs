/* eslint-disable camelcase */
const BASE_URL = import.meta.env.VITE_API_URL

const url_registro = `${BASE_URL}user/registro`
const url_login = `${BASE_URL}user/login`
const url_updatePerfil = `${BASE_URL}user/perfil`
const url_createQuejas = `${BASE_URL}user/quejas`

export {
  url_registro,
  url_login,
  url_updatePerfil,
  url_createQuejas
}
