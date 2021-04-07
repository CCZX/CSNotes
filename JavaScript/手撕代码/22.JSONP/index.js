/**
 * 利用 script 不受同源策略的限制，只支持 GET 请求
 */
function jsonp({ url, params, callback }) {
  const genURL = () => {
    const queryURL = `&callback=${callback}`
    Object.keys(params).forEach(key => {
      queryURL += `&${key}=${params[key]}`
    })
    return `${url}${queryURL}`
  }

  return new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = genURL
    document.body.appendChild(el)
    window[callback] = (data) => {
      resolve(data)
    }
  })
}

// server端
const Koa = require('koa');
const app = new Koa();
const items = [{ id: 1, title: 'title1' }, { id: 2, title: 'title2' }]

app.use(async (ctx, next) => {
  if (ctx.path === '/api/jsonp') {
    const { callback } = ctx.query;
    ctx.body = `${callback}(${JSON.stringify(items)})`;
    return;
  }
})
console.log('listen 8080...')
app.listen(8080);
