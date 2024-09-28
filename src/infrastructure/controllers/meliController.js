const ApiKeyValidator = require('../validators/apiKeyValidator');
const GetTokenUseCase = require('../../application/use-cases/getTokenUseCase');

class MeliController {
  constructor() {
    this.getTokenUseCase = new GetTokenUseCase();
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
}

module.exports = MeliController;
