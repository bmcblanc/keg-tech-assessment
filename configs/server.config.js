const { uuid } = require('@keg-hub/jsutils')

const apiPort = 5005
const uiPort = 3000

module.exports = {
  api: {
    origins: [`http://localhost:${uiPort}`], //TODO: update before cloud deploy
    port: apiPort,
    host: '0.0.0.0',
    uuid: uuid(),
    baseUrl: `http://localhost:${apiPort}`,
  },
  web: {
    port: uiPort,
    host: '0.0.0.0',
  },
}
