import { AsyncStorage } from 'react-native';
import { appConfig } from '../config'

// const DB = {}

// appConfig.tabMenu.forEach(({key}) => {
//   let k = key.toString()
//   DB[k] = Store.model(k)
// })

export const get = (key, value) => {
  return AsyncStorage.getItem(key)
}

export const multiGet = (keys) => {
  return multiGet(keys)
}

export const save = (key, data) => {
  return AsyncStorage.setItem(key, JSON.stringify(data))
}

export const mergeData = (a, b) => {
  let result = [].concat(a, b.filter(item => !a.find(x => x.id === item.id)))
  if (result.length > 100) {
    result.splice(100) 
  }
  return result.sort((a, b) => b.created - a.created)
}