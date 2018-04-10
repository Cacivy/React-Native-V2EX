const host = 'https://www.v2ex.com'

const apis = {
  all: '/api/topics/latest.json',
  hot: '/api/topics/hot.json' 
}

Object.keys(apis).forEach(key => {
  apis[key] = host + apis[key]
})

export default apis