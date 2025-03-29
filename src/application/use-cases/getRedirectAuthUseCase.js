const ParamRepository = require('../../infrastructure/repositories/paramRepository');
const axios = require('axios');
const URLSearchParams = require('url-search-params');

class GetRedirectAuthUseCase {
  constructor() {
    this.repo = new ParamRepository();
  }

  async execute(code) {
    // Guardar o actualizar el code_tg
    console.log("Guardar o actualizar el code_tg")
    await this.repo.saveOrUpdate('code_tg', 'auth_ml', code);

    // Preparar llamada a Mercado Libre
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.API_ML_CLIENT_ID,
      client_secret: process.env.API_ML_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.API_ML_REDIRECT_URI
    });

    const url = 'https://api.mercadolibre.com/oauth/token';
    const response = await axios.post(url, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Guardar ambos tokens
    console.log("Guardar ambos tokens: accessToken and refreshToken")
    await this.repo.saveOrUpdate('access_token', 'auth_ml', accessToken);
    await this.repo.saveOrUpdate('refresh_token', 'auth_ml', refreshToken);

    return accessToken;
  }
}

module.exports = GetRedirectAuthUseCase;
