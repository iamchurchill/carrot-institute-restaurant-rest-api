class Util {
  static isAppInProduction() {
    return process.env.NODE_ENV === "production";
  }

  static getUrl() {
    try {
      if (Util.isAppInProduction()) {
        return process.env.APP_URL;
      } else {
        return process.env.APP_DEVELOPMENT_URL;
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = Util;
