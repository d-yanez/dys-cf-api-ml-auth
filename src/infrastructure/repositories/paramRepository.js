const Param = require('../models/param');

class ParamRepository {
  async findParamByName(name) {
    return await Param.findOne({ name: name });
  }
}

module.exports = ParamRepository;
