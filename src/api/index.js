import {apis} from '../config'

export const request = url => {
  return new Promise((reslove, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => reslove(data))
      .catch(e => reject(e));
  });
}

export const getTopicsByName = (name) => {
  if (Array.isArray(name)) {
    return new Promise((reslove, reject) => {
      Promise.all(name.map(item => request(apis.topics + item)))
      .then(data => {
        let result = []
        data.forEach(item => result = result.concat(item))
        result.sort((a, b) => b.created - a.created)
        reslove(result)
      })
    })  
  }
  let url = apis[name] || (apis.topics + name)
  return request(url)
}

export const getRepliesByTopicId = (id) => {
  return request(apis.replies + id)
}