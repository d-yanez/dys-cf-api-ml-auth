const ParamRepository = require('../../infrastructure/repositories/paramRepository');
const MercadoLibreService = require('../../infrastructure/services/mercadoLibreService');

class GetTokenUseCase {
  constructor() {
    this.paramRepository = new ParamRepository();
    this.mercadoLibreService = new MercadoLibreService();
  }

  async execute() {
    const param = await this.paramRepository.findParamByName('code_tg');
    if (!param) {
      throw new Error('No se encontró el parámetro code_tg en MongoDB');
    }
    const accessToken = await this.mercadoLibreService.getAccessToken(param.value);
    return accessToken;
  } 
}

module.exports = GetTokenUseCase;
