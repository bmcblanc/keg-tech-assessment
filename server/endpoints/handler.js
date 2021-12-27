const { isObj, pickKeys } = require(`@keg-hub/jsutils`)

const logError = error => {
  console.error(error)
}

const handleApiErr = (req, res, err, status) => {
  const error = {
    message: isObj(err) ? err.message : err || `An api error occurred!`,
  }
  res.statusCode = status || 400
  logError(err.stack || err.message)

  return res.json({
    status: res.statusCode,
    error: error,
  })
}

const logResponse = (req, res) => {
  const { method, url, ...reqRest } = pickKeys(req, [
    'method',
    'url',
    'hostname',
    'body',
    'query',
    'params',
  ])

  console.log(`REQUEST: ${method} ${url}\n`, reqRest)
}

const handleApiResponse = (req, res, data, status) => {
  res.statusCode = status || 200
  logResponse(req, res)

  return res.json({
    data,
    status: res.statusCode,
  })
}

module.exports = {
  apiErr: handleApiErr,
  apiResponse: handleApiResponse,
}
