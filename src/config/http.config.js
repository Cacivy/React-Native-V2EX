const host = 'https://www.v2ex.com'

const apis = {
  all: '/api/topics/latest.json',
  hot: '/api/topics/hot.json',
  replies: '/api/replies/show.json?topic_id=',
  topics: '/api/topics/show.json?node_name=',
}

Object.keys(apis).forEach(key => {
  apis[key] = host + apis[key]
})

export default apis