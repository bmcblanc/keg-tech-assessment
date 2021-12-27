const axios = require('axios')
const { api: apiConfig } = require('../../../configs/server.config')
const { initApi } = require('../../../server/server')

jest.mock('../../../server/libs/goatsLib.js')

describe("testing-goat-facts-api", () => {

    let appServer
    beforeAll(() => {
        appServer = initApi()
    })
    
    afterAll(() => {
        appServer.then(apps => {
            apps.server.close()
        })
    })

    it("GET /goats - errorHandling", async () => {
        await axios.get(`${apiConfig.baseUrl}/goats`)
            .catch(error => {
                expect(error.response.status).toBe(400)
                expect(error.response.statusText).toBe('Bad Request')
            })
    })
})