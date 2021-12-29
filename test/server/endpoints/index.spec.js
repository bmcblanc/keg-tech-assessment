const axios = require('axios')
const { api: apiConfig } = require('../../../configs/server.config')
const { initApi } = require('../../../server/server')

jest.mock('../../../server/db/mongodb.js')
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

    it("GET /goats - success", async () => {
        await axios.get(`${apiConfig.baseUrl}/goats`)
            .then(response => {
                expect(response.data.status).toBe(200)
                expect(response.data.data.length).toBe(20)
            })
    })

    it("GET /goatss - catchAll", async () => {
        await axios.get(`${apiConfig.baseUrl}/goatss`)
            .then(response => {
                expect(response.data.status).toBe(200)
                expect(response.data.data).toHaveProperty('uuid')
                expect(response.data.data).toHaveProperty('inDocker')
            })
    })
})