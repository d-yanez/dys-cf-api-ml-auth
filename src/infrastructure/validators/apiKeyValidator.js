class ApiKeyValidator {
    static validate(apiKey) {
      if (apiKey !== process.env.API_KEY) {
        return false;
      }
      return true;
    }
  }
  
  module.exports = ApiKeyValidator;
  