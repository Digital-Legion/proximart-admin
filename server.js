const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()

// eslint-disable-next-line no-path-concat
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))

app.use(staticFileMiddleware)
app.use(history({
  disableDotRule: true,
  verbose: true
}))
app.use(staticFileMiddleware)

app.get('/', function (req, res) {
  // eslint-disable-next-line no-path-concat
  res.render(path.join(__dirname + '/dist/index.html'))
})

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port
  console.log('App now running on port', port)
})
