const axios = require('axios')
const domain = 'http://jelly.jd.com'
let num = 1

function freshInterface (url) {
  const pathname = new URL(url).pathname
  const id = new URL(url).searchParams.get('id')
  axios.get(`${domain}${pathname}`, {
    params: {
      id,
      preview: 'false'
    },
    headers: {
      Cookie: 'koa:sess=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWIwZmYzOWY2Mjk4MzRhMzRiNjYzNTUwIn0sIl9leHBpcmUiOjE1OTM5MTYzMzUzNTUsIl9tYXhBZ2UiOjYwNDgwMDAwMH0=; koa:sess.sig=kZHe0K38PLBPjQf37fJnuzJ_nO0;'
      // Authorization: ''
    }
  })
    .then(res => {
      console.log(num++, 'num')
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
// setInterval(freshInterface, Math.round(Math.random() * (1000 * globalSec))) // 0~30s随机执行一次

export default freshInterface
