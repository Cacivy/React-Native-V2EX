const host = 'https://www.v2ex.com'

const apis = {
  all: '/api/topics/latest.json',
  hot: '/api/topics/hot.json',
  tech: '/api/topics/show.json?node_name=tech',
  jobs: '/api/topics/show.json?node_name=jobs',
  ideas: '/api/topics/show.json?node_name=ideas'
}

Object.keys(apis).forEach(key => {
  apis[key] = host + apis[key]
})

export default apis