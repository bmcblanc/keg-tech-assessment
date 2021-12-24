import { addGoatFacts } from './addGoatFacts';

const axios = require('axios')
const {api: apiConfig} = require('../configs/server.config')

/**
 * getGoatFacts - Gets a list of goat facts from the backend API
 */
export const getGoatFacts = async () => {
  // Add call to API endpoint goats
  axios.get(`${apiConfig.baseUrl}/goats`)
      .then(response => {
        addGoatFacts(response.data.content)
      })
      .catch(error => {
        console.log(error);
      });

}
