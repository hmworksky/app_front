import {get, post} from '../utils/request'


export function getAppList(query) {
  return get('/generate/detail/', query)
}

export function addApp(data) {
  return post('/ui/app/', data)
}
