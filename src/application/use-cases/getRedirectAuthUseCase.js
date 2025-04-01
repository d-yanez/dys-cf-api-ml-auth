const ParamRepository = require('../../infrastructure/repositories/paramRepository');
const axios = require('axios');
const URLSearchParams = require('url-search-params');

class GetRedirectAuthUseCase {
  constructor() {
    this.repo = new ParamRepository();
  }

  async execute(code) {
    try {
      console.log("Guardar o actualizar el code_tg");
      await this.repo.saveOrUpdate('code_tg', 'auth_ml', code);
  
      console.log("Preparando parámetros para Mercado Libre...");
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.API_ML_CLIENT_ID,
        client_secret: process.env.API_ML_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.API_ML_REDIRECT_URI
      });
  
      const url = 'https://api.mercadolibre.com/oauth/token';
      console.log(`Llamando a: ${url}`);
      console.log(`process.env.API_ML_REDIRECT_URI: ${process.env.API_ML_REDIRECT_URI}`);
      let response;
  
      try {
        response = await axios.post(url, params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
      } catch (err) {
        console.error(" Error en la solicitud a Mercado Libre:");
        if (err.response) {
          console.error("➡️ Status:", err.response.status);
          console.error("➡️ Data:", err.response.data);
        } else {
          console.error("➡️ Mensaje:", err.message);
        }
        throw new Error("Error al obtener token desde Mercado Libre");
      }
  
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
  
      console.log("Guardar access_token y refresh_token...");
      await this.repo.saveOrUpdate('access_token', 'auth_ml', accessToken);
      await this.repo.saveOrUpdate('refresh_token', 'auth_ml', refreshToken);
  
      return accessToken;
    } catch (error) {
      console.error(" Error general en GetRedirectAuthUseCase.execute:", error.message);
      throw error;
    }
  }
  
}

module.exports = GetRedirectAuthUseCase;
