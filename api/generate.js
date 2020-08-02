import {get, post} from '../utils/request'


export function getSendConf(query) {
  return get({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function sendData(data) {
  return post('/generate/data/', data)
}
