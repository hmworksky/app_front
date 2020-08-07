import {get, post} from '../utils/request'


export function getSendDetail(query) {
  return get('/generate/detail/', query)
}

export function sendData(data) {
  return post('/generate/data/', data)
}
