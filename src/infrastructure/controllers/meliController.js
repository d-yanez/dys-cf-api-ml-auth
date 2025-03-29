const ApiKeyValidator = require('../validators/apiKeyValidator');
const GetTokenUseCase = require('../../application/use-cases/getTokenUseCase');
const GetRedirectAuthUseCase = require('../../application/use-cases/getRedirectAuthUseCase');

class MeliController {
  constructor() {
    this.getTokenUseCase = new GetTokenUseCase();
    this.getRedirectAuthUseCase = new GetRedirectAuthUseCase();
  }

  async getToken(req, res) {
    console.log("getToken - init")
    try {
      const apiKey = req.headers['x-api-key'];
      if (!ApiKeyValidator.validate(apiKey)) {
        return res.status(403).json({ success: false, message: 'API Key inválida' });
      }

      const token = await this.getTokenUseCase.execute();
      res.status(200).json({ success: true, token: token, responseCode: 0 });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, responseCode: 1, message: 'Error interno del servidor' });
    }
  }

  async redirectAuth(req, res) {
    console.log("redirectAuth - init")
    try {
      const code = req.query.code;
      console.log(`code->${code}`)
      if (!code) {
        console.log("Code requerido en query!")
        return res.status(400).json({ success: false, message: 'Code requerido en query' });
      }
  
      //const useCase = new GetRedirectAuthUseCase();
      const accessToken = await this.getRedirectAuthUseCase.execute(code);
  
      res.status(200).json({ success: true, access_token: accessToken });
    } catch (error) {
      console.error('Error en redirectAuth:', error.message);
      res.status(500).json({ success: false, message: 'Error interno' });
    }
  }
  
}

module.exports = MeliController;
