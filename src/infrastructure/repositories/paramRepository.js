const Param = require('../models/param');

class ParamRepository {
  async findParamByName(name) {
    return await Param.findOne({ name: name });
  }
  async saveOrUpdate(name, type, value) {
    const doc = await Param.findOne({ name, type });
    if (doc) {
      await doc.updateOne({ value });
    } else {
      const instance = new Param({ name, type, value });
      await instance.save();
    }
  }

  async getValue(name, type) {
    const doc = await Param.findOne({ name, type });
    return doc ? doc.value : null;
  }
}

module.exports = ParamRepository;
