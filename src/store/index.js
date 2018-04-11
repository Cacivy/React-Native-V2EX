import Store from 'react-native-store';
import { appConfig } from '../config'

const DB = {}

appConfig.tabMenu.forEach(({key}) => {
  DB[key] = Store.model(key)
})

export const get = (key, value) => {
  return DB[key].find() || []
}

export const save = (key, data) => {
  DB[key].remove().then(() => {
    DB[key].add(data)
  })
}

export const mergeData = (a, b) => {
  let result = [].concat(a, b.filter(item => !a.find(x => x.id === item.id)))
  if (result.length > 100) {
    result.splice(100) 
  }
  return result
}