import axios from 'axios'
import { api as apiConfig } from '../../../configs/server.config'
import { initApi } from '../../../server/server'

jest.mock('../../../server/db/mongodb.js')
jest.mock('../../../server/libs/goatsLib.js')

describe("testing-goat-facts-api-error", () => {

    let appServer
    beforeAll(() => {
        process.env['TEST_ERROR'] = true
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