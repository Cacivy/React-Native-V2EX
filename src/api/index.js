import {apis} from '../config'

export const request = url => {
  return new Promise((reslove, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => reslove(data))
      .catch(e => reject(e));
  });
}

export const getTopicsByName = (key) => {
  return request(apis[key])
}

export const getRepliesByTopicId = (id) => {
  return request(apis.replies + id)
}