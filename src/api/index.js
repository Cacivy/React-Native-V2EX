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
  let url = apis[name] || (apis.topics + name)
  return request(url)
}

export const getRepliesByTopicId = (id) => {
  return request(apis.replies + id)
}