const axios = require('axios');
const URLSearchParams = require('url-search-params');

class MercadoLibreService {
  async getAccessToken(refreshToken) {
    console.log("getAccessToken - init")
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.API_ML_CLIENT_ID,
      client_secret: process.env.API_ML_CLIENT_SECRET,
      refresh_token: refreshToken
    });

    try {
      const response = await axios.post('https://api.mercadolibre.com/oauth/token', params);
      console.log(`token: ${response.data.access_token}`)
      return response.data.access_token;
    } catch (error) {
      console.error('Error en la API de Mercado Libre:', error);
      throw error;
    }
  }
}

module.exports = MercadoLibreService;
