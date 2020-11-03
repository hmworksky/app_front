import {get, post} from '../utils/request'

export function getAppList(query) {
  return get('/ui/app/', query)
}

export function addApp(data) {
  return post('/ui/app/', data)
}

export function getPageList(query) {
  return get('/ui/page/', query)
}

export function addPage(data) {
  return post('/ui/page/', data)
}
